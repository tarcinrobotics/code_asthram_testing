// ParentComponent.js
import React, { useState } from 'react';
import FloatingMiniScreen from './FloatingMiniScreen.js';
import ModuleProjectDropdown from '../dropDown.js'; // Assuming dropDown.js is in the same directory

const ParentComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <>
      <ModuleProjectDropdown onSelectImage={handleSelectImage} />
      {selectedImage && <FloatingMiniScreen imageUrl={selectedImage} />}
    </>
  );
};

export default ParentComponent;
