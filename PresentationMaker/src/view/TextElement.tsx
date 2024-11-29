import { CSSProperties } from "react"
import { TextElement } from "../entities/Presentation.ts";

type TextElementProps = {
  textElement: TextElement;
  scale?: number;
};

function TextObject({ textElement, scale = 1 }: TextElementProps) {
  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textElement.pos.y * scale}px`,
    left: `${textElement.pos.x * scale}px`,
    width: `${textElement.size.width * scale}px`,
    height: `${textElement.size.heigth * scale}px`,
    fontSize: `${textElement.fontSize * scale}px`,
  };

  return <p style={textObjectStyles}>{textElement.text}</p>;
}

export { TextObject };
