import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

import Card from "./components/Card";

import "./App.css";
import { fetcher } from "./service/fetcher";
import Spinner from "./components/Spinner";

function App() {
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    console.log('go scroll');
    setSize(size + 1);
  }

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // reached the end
      return `https://api.spacexdata.com/v3/launches?limit=5&offset=${pageIndex}`; // SWR key
    },
    fetcher
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Spinner />;

  return (
    <div>
      <input />
      {data.map((launches) => {
        return launches.map((item) => (
          <Card
            key={item.flight_number}
            missionName={item.mission_name}
            isUpcoming={item.upcoming}
            isSuccess={item.launch_success}
            launchDateUtc={item.launch_date_utc}
            articleLink={item.article_link}
            videoLink={item.video_link}
            image={item.mission_patch_small}
            description={item.details}
          />
        ))
      })}
      {isValidating && <Spinner />}
    </div>
    
  );
}

export default App;
