import { CSSProperties } from "react";
import { SlideType } from "../entities/Presentation";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
  isSelected: boolean;
  scale?: number;
  slide: SlideType;
  className: string;
};

function Slide({ isSelected, scale, slide, className }: SlideProps) {
  const slideStyles: CSSProperties = {
    width: `${SLIDE_WIDTH * scale}px`,
    height: `${SLIDE_HEIGHT * scale}px`,
  };

  if (isSelected) {
    slideStyles.border = "3px solid #0b57d0";
  }

  return (
    <div style={slideStyles} className={className}>
      {slide.elements.map((slideElement) => {
        switch (slideElement.type) {
          case "text":
            return <TextElement key={slideElement.id} textElement={slideElement} scale={scale} />;
          case "image":
            return <ImageElement key={slideElement.id} imageElement={slideElement} scale={scale} />;
          default:
            throw new Error(`Unknown slide type`);
        }
      })}
    </div>
  );
}

export { Slide };
