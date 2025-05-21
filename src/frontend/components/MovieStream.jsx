// components/YouTubeEmbed.jsx
import React, { useEffect, useState } from 'react';

const Stream = ({videoID, server}) => {

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
              return `https://player.videasy.net/movie/${videoID}`;

            case 1:
              return `https://111movies.com/movie/${videoID}`;

            case 2:
              return `https://vidfast.pro/movie/${videoID}`;

            case 3:
              return `https://vidjoy.pro/embed/movie/${videoID}}`;
            
            case 4: 
              return `https://www.2embed.cc/embed/${videoID}`;
          
            default:
              return `https://player.videasy.net/movie/${videoID}`;
          }
        })()}
        frameborder="0"
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Stream