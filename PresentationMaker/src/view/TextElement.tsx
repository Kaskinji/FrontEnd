import { CSSProperties } from "react";
import { Text } from "../entities/Presentation";

type TextElementProps = {
  textElement: Text;
  scale?: number;
};

function TextElement({ textElement, scale = 1 }: TextElementProps) {
  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textElement.pos.y * scale}px`,
    left: `${textElement.pos.x * scale}px`,
    width: `${textElement.size.width * scale}px`,
    height: `${textElement.size.heigth * scale}px`,
    fontFamily: textElement.fontFamily,
    fontSize: `${textElement.fontSize}px`,
  };

  return <p style={imageObjectStyles}>{textElement.text}</p>;
}

export { TextElement };
