import { useState } from "react";
import "./ImageCarousel.css";
import raja from "../assets/raja.jpg";
import element from "../assets/element1.png";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [raja, element, raja, element, raja, element, raja, element];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <div className="carousel-image-container" onClick={handleNextImage}>
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <div className="carousel-counter">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
