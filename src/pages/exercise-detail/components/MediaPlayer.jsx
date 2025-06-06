import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const MediaPlayer = ({ image, video, exerciseName }) => {
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVideoMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVideoMode(!isVideoMode);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
          <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <Image
            src={isVideoMode ? video : image}
            alt={`${exerciseName} demonstration`}
            className="w-full h-full object-cover"
          />
          
          {/* Play/Image Toggle Button */}
          <button
            onClick={toggleVideoMode}
            className="absolute top-4 right-4 bg-surface bg-opacity-90 backdrop-blur-sm border border-opacity-20 rounded-lg p-3 hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isVideoMode ? "Switch to image view" : "Switch to video view"}
          >
            <Icon 
              name={isVideoMode ? "Image" : "Play"} 
              size={20} 
              color="var(--color-text-primary)" 
            />
          </button>

          {/* Video Overlay (when in video mode) */}
          {isVideoMode && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="bg-primary bg-opacity-80 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Play video"
              >
                <Icon name="Play" size={32} color="white" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaPlayer;