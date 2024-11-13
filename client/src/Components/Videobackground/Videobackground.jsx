import React from 'react';
import './Videobackground.css'; 

const Videobackground = ({ videoSrc, overlayColor, children }) => {
  return (
    <div className="video-background-container">
      <video autoPlay muted loop className="video-background">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay" style={{ backgroundColor: overlayColor }}></div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Videobackground;
