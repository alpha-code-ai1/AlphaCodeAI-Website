import { useState, useEffect } from 'react';

const BackgroundVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-primary">
      {/* Placeholder gradient while video loads */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Video container */}
      <div className="absolute inset-0">
        <video
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <source 
            src="/videos/background.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default BackgroundVideo; 