import React from "react";
import videoSos from "../../assets/caetano portal-en-chapa.mp4";
import "./Collection.css";

const Collection = () => {
  return (
    <div className="app-basic-view-main-container">
      <div className="collection-video-container">
        <div className="video-container">
          <video autoPlay controls className="video">
            <source src={videoSos} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-container">
          <p className="video-title">AW24Paris, March 2nd, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Collection;
