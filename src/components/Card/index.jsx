import { useState } from "react";
import { Link } from "react-router-dom";

import './style.css'
import moment from "moment";

export default function Card({
  missionName,
  isUpcoming,
  isSuccess,
  launchDateUtc,
  videoLink,
  articleLink,
  image,
  description,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p>
        <span className="missionName">{missionName}</span>
        <span className="status">
          {isUpcoming ? "upcoming" : isSuccess ? "success" : "failed"}
        </span>
      </p>

      {isExpanded && (
        <div>
          <p>
            <span>{moment(launchDateUtc).fromNow()} </span>
            {videoLink && <span>| <Link to={videoLink} target="_blank">Video</Link> </span>}
            {articleLink && <span>| <Link to={articleLink} target="_blank">Article</Link> </span>}
          </p>
          {image ? (
            <img src={image} alt="Mission Badge" />
          ) : (
            <span>No image yet.</span>
          )}
          {description ? (
            <p>{description}</p>
          ) : (
            <span>No description yet.</span>
          )}
        </div>
      )}

      <button onClick={() => setIsExpanded((state) => !state)}>
        {isExpanded ? "HIDE" : "VIEW"}
      </button>
    </div>
  );
}
