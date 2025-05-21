// components/YouTubeEmbed.jsx
import React, { useEffect, useState } from 'react';
import DropMenu from './dropMenu.jsx'

const TvStream = ({videoID, s, e, server}) => {

  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey(prevKey => prevKey + 1)
  }, [server])

  return (
    <div className="relative w-full rounded-2xl border-t-2 shadow-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
      <iframe
        key={iframeKey}
        className="absolute top-0 left-0 w-full h-full"
        src={(function () {
          switch (server) {
            case 0:
              return `https://player.videasy.net/tv/${videoID}/${s}/${e}`;

            case 1:
              return `https://111movies.com/tv/${videoID}/${s}/${e}`;

            case 2:
              return `https://vidfast.pro/tv/${videoID}/${s}/${e}`;

            case 3:
              return `https://vidjoy.pro/embed/tv/${videoID}/${s}/${e}`;
            
            case 4:
              return `https://www.2embed.cc/embedtv/${videoID}&s=${s}&e=${e}`;
          
            default:
              return `https://player.videasy.net/tv/${videoID}/${s}/${e}`;
          }
        })()}
        frameborder="0"
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default TvStream