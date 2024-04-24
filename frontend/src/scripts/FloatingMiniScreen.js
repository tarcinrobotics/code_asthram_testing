import React, { useState } from 'react';
import './FloatingMiniScreen.css'; // Import CSS file

const FloatingMiniScreen = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [fullSizeImage, setFullSizeImage] = useState(null);

  const handleCloseButtonClick = () => {
    setIsOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setFullSizeImage(imageUrl);
  };

  const handleCloseFullSizeImage = () => {
    setFullSizeImage(null);
  };

  return (
    <>
      {isOpen && (
        <div className="floating-mini-screen">
          <button className="close-button" onClick={handleCloseButtonClick}>
            Close
          </button>
          {/* Content of the mini screen */}
          {/* Here you can display media content such as images, videos, etc. */}
          <img
            src="your_image_url.jpg"
            alt="Media"
            onClick={() => handleImageClick("your_image_url.jpg")}
          />
        </div>
      )}

      {/* Full-size image modal */}
      {fullSizeImage && (
        <div className="full-size-image-modal" onClick={handleCloseFullSizeImage}>
          <img src={fullSizeImage} alt="Full Size" />
        </div>
      )}
    </>
  );
};

export default FloatingMiniScreen;
