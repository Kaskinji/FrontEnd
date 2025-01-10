import { CSSProperties } from "react";
import { SlideType } from "../../entities/Presentation.ts";
import { TextObject } from "../TextElement.tsx";
import { ImageObject } from "../ImageElement.tsx";
import styles from "./Slide.module.css";

type SlideProps = {
  isSelected: boolean;
  scale?: number;
  slide: SlideType;
};

function Slide({ slide, scale = 1, isSelected }: SlideProps) {
  const slideStyles: CSSProperties = {
    width: `${1300 * scale}px`,
    height: `${800 * scale}px`,
    background: slide.background || "#ffffff",
    backgroundImage: slide.background ? `url(${slide.background})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: isSelected ? "2px solid #7c8ad0" : "3px solid transparent",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={slideStyles} className={styles.slideStyles}>
      {slide.elements.map((slideElement) => {
        if (!slideElement || !slideElement.type) {
          console.error("Invalid slide element", slideElement);
          return null;
        }

        switch (slideElement.type) {
          case "text":
            return (
              <TextObject
                key={slideElement.id}
                textElement={slideElement}
                isSelected={isSelected}
                scale={scale}
              />
            );
          case "image":
            return (
              <ImageObject
                key={slideElement.id}
                imageElement={slideElement}
                scale={scale}
              />
            );
          default:
            console.warn("Unknown element type", slideElement.type);
            return null;
        }
      })}

    </div>
  );
}


export { Slide };