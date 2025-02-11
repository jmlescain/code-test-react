import { useState } from "react";
import { Link } from "react-router-dom";

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
        <span>{missionName}</span>
        {isUpcoming ? (
          <span>upcoming</span>
        ) : isSuccess ? (
          <span>success</span>
        ) : (
          <span>failed</span>
        )}
      </p>

      {isExpanded && (
        <div>
          <p>
            <span>{launchDateUtc}</span>
            {videoLink && (
              <span>
                | <Link to={videoLink}>Video</Link>{" "}
              </span>
            )}
            {articleLink && (
              <span>
                | <Link to={articleLink}>Article</Link>{" "}
              </span>
            )}
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
