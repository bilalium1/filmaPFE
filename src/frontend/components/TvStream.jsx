// components/YouTubeEmbed.jsx
import React from 'react';
import DropMenu from './dropMenu.jsx'

const TvStream = ({videoID, s, e}) => {
  return (
    <div className="relative w-full rounded-2xl border-t-2 shadow-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://player.videasy.net/tv/${videoID}/${s}/${e}`}
        frameborder="0"
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default TvStream