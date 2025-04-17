import React, { useRef, useEffect } from "react";
import Sketch from "react-p5";
import sofa1 from "../../assets/sofa.png";
import sofa2 from "../../assets/sofa2.png";
import sillon3 from "../../assets/sillon3.png";
import sofa4 from "../../assets/sofa4.png";

import green from "../../assets/cyan.jpeg";
import cyan from "../../assets/green.jpeg";
import red from "../../assets/red.jpeg";
import ground from "../../assets/brown.jpeg";

import { useColorTheme } from "../../context/ColorThemeContext";
import { colorPalettes } from "../../utils/colorPalletes";

const sofaImagesByTheme = {
  cyan: sofa1,
  green: sofa2,
  ground: sillon3,
  red: sofa4,
};

const artworkImagesByTheme = {
  cyan: cyan,
  green: green,
  ground: ground,
  red: red,
};

const LivingSketch = () => {
  const sofaImg = useRef();
  const artworkImg = useRef();
  const carpetTexture = useRef(null);

  const { theme } = useColorTheme();
  const selectedColors = colorPalettes[theme]?.colors || ["#000000"];

  const artworkPos = useRef({ x: 720, y: 150 });
  const sofaPos = useRef({ x: 50, y: 400 });

  const isDraggingArtwork = useRef(false);
  const isDraggingSofa = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const preload = (p5) => {
    const sofaPath = sofaImagesByTheme[theme] || sofa1;
    const artworkPath = artworkImagesByTheme[theme] || artwork1;
    sofaImg.current = p5.loadImage(sofaPath);
    artworkImg.current = p5.loadImage(artworkPath);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(30);

    // Crear textura de alfombra solo una vez
    const carpetLayer = p5.createGraphics(p5.width, p5.height);
    const carpetColor = selectedColors[1];
    carpetLayer.fill(carpetColor);
    carpetLayer.noStroke();
    carpetLayer.rect(0, p5.height * 0.6, p5.width, p5.height * 0.4);

    carpetLayer.strokeWeight(0.5);
    carpetLayer.stroke(p5.lerpColor(p5.color(carpetColor), p5.color(0), 0.2));

    for (let i = p5.height * 0.6; i < p5.height; i += 10) {
      for (let j = 0; j < p5.width; j += 10) {
        const rand = p5.random(0.3, 1);
        carpetLayer.fill(
          p5.red(carpetColor) * rand,
          p5.green(carpetColor) * rand,
          p5.blue(carpetColor) * rand
        );
        carpetLayer.circle(
          j + p5.random(-1, 1),
          i + p5.random(-1, 1),
          p5.random(1, 3)
        );
      }
    }

    carpetTexture.current = carpetLayer;
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const draw = (p5) => {
    p5.clear();

    // Fondo
    p5.fill(245, 245, 245);
    p5.rect(0, 0, p5.width, p5.height * 0.6); // pared

    if (carpetTexture.current) {
      p5.image(carpetTexture.current, 0, 0);
    }

    // Sofá
    if (sofaImg.current) {
      const img = sofaImg.current;
      const scaledWidth = 500;
      const scaledHeight = scaledWidth * (img.height / img.width);
      p5.image(
        sofaImg.current,
        sofaPos.current.x,
        sofaPos.current.y,
        scaledWidth,
        scaledHeight
      );
    }

    // Artwork
    if (artworkImg.current) {
      const img = artworkImg.current;
      const targetHeight = 220;
      const aspectRatio = img.width / img.height;
      const targetWidth = targetHeight * aspectRatio;
      p5.image(
        img,
        artworkPos.current.x,
        artworkPos.current.y,
        targetWidth,
        targetHeight
      );
    }
  };

  const mousePressed = (p5) => {
    if (artworkImg.current) {
      const img = artworkImg.current;
      const targetHeight = 120;
      const targetWidth = targetHeight * (img.width / img.height);
      const { x, y } = artworkPos.current;

      if (
        p5.mouseX >= x &&
        p5.mouseX <= x + targetWidth &&
        p5.mouseY >= y &&
        p5.mouseY <= y + targetHeight
      ) {
        isDraggingArtwork.current = true;
        dragOffset.current = { x: p5.mouseX - x, y: p5.mouseY - y };
        return;
      }
    }

    if (sofaImg.current) {
      const img = sofaImg.current;
      const scaledWidth = 500;
      const scaledHeight = scaledWidth * (img.height / img.width);
      const { x, y } = sofaPos.current;

      if (
        p5.mouseX >= x &&
        p5.mouseX <= x + scaledWidth &&
        p5.mouseY >= y &&
        p5.mouseY <= y + scaledHeight
      ) {
        isDraggingSofa.current = true;
        dragOffset.current = { x: p5.mouseX - x, y: p5.mouseY - y };
      }
    }
  };

  const mouseDragged = (p5) => {
    if (isDraggingArtwork.current && artworkImg.current) {
      const img = artworkImg.current;
      const targetHeight = 120;
      const targetWidth = targetHeight * (img.width / img.height);

      artworkPos.current = {
        x: p5.constrain(
          p5.mouseX - dragOffset.current.x,
          0,
          p5.width - targetWidth
        ),
        y: p5.constrain(
          p5.mouseY - dragOffset.current.y,
          0,
          p5.height - targetHeight
        ),
      };
    }

    if (isDraggingSofa.current && sofaImg.current) {
      const img = sofaImg.current;
      const scaledWidth = 500;
      const scaledHeight = scaledWidth * (img.height / img.width);

      sofaPos.current = {
        x: p5.constrain(
          p5.mouseX - dragOffset.current.x,
          0,
          p5.width - scaledWidth
        ),
        y: p5.constrain(
          p5.mouseY - dragOffset.current.y,
          0,
          p5.height - scaledHeight
        ),
      };
    }
  };

  const mouseReleased = () => {
    isDraggingArtwork.current = false;
    isDraggingSofa.current = false;
  };

  return (
    <div className="app-basic-view-main-container">
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
        windowResized={windowResized}
      />
    </div>
  );
};

export default LivingSketch;
