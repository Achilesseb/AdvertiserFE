// src/components/YouTubePlayer.js

import React, { useRef, useEffect, useState } from "react";

const YouTubePlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyCk45PzZiU_1WvhliIcMKsvrVMqeIfBDxc`
        );
        const data = await response.json();
        if (data.items.length > 0) {
          setVideoData(data.items[0]);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, [videoId]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div>
      <iframe
        ref={videoRef}
        width="560"
        height="315"
        src={videoEmbedUrl}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
