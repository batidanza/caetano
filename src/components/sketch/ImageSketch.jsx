import React from "react";
import Sketch from "react-p5";
import img1 from "../../assets/anillos/anillo1.png";
import img2 from "../../assets/anillos/anillo2.png";
import img3 from "../../assets/anillos/anillo3.png";
import img4 from "../../assets/anillos/anillo4.png";
import img5 from "../../assets/anillos/anillo5.png";
import img6 from "../../assets/anillos/anillo6.png";
import img7 from "../../assets/anillos/anillo7.png";

const images = [img1, img2, img3, img4, img5, img6, img7];

const ImageSketch = () => {
  let img;
  let imgIndex = 0;
  let isDrawing = false; // Controla si el mouse debe dibujar
  const imgSize = 250; // Tamaño aún más grande para la imagen

  const preload = (p5) => {
    img = p5.loadImage(images[imgIndex]);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(245, 245, 245);
  };

  const draw = (p5) => {
    if (isDrawing) {
      p5.image(img, p5.mouseX - imgSize / 2, p5.mouseY - imgSize / 2, imgSize, imgSize);
    }
  };

  const mousePressed = (p5) => {
    isDrawing = true; // Activa el dibujo con el mouse
    imgIndex = (imgIndex + 1) % images.length; // Cambia a la siguiente imagen
    img = p5.loadImage(images[imgIndex]); // Carga la nueva imagen
  };

  return <Sketch preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} />;
};

export default ImageSketch;
