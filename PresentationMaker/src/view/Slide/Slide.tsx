import { CSSProperties } from "react";
import { TextObject } from "../TextElement.tsx";
import { ImageElementFunc } from "../ImageElement.tsx";
import { SlideType } from "../../entities/Presentation.ts";
import styles from '../Slide/Slide.module.css';

const SLIDE_WIDTH = 1100;
const SLIDE_HEIGHT = 700;

type SlideProps = {
  isSelected: boolean;
  scale?: number;
  slide: SlideType;
  className: string;
};

function Slide({ isSelected, scale = 1, slide, className }: SlideProps) {
  const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`,
  };

  if (isSelected) {
    slideStyles.border = "3px solid #0b57d0";
  }

  return (
    <div style={slideStyles} className={styles.slide + ' ' + className}>
      {slide.elements.map((slideElement) => {
        switch (slideElement.type) {
          case "text":
            return <TextObject key={slideElement.id} textElement={slideElement} scale={scale} />;
          case "image":
            return <ImageElementFunc key={slideElement.id} imageElement={slideElement} scale={scale} />;
          default:
            throw new Error(`Unknown slide type`);
        }
      })}
    </div>
  );
}

export { Slide };
