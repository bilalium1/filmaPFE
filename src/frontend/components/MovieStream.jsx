// components/YouTubeEmbed.jsx
import React from 'react';

const Stream = ({videoID}) => {
  return (
    <div className="relative w-full rounded-2xl border-t-2 shadow-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://player.videasy.net/movie/${videoID}`}
        frameborder="0"
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Stream;
