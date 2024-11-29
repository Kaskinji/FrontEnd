import { CSSProperties } from "react";
import { ImageElement } from "../entities/Presentation.ts";

type ImageElementProps = {
  imageElement: ImageElement
  scale?: number;
};

function ImageElementFunc({ imageElement, scale = 1 }: ImageElementProps) {
  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageElement.pos.x * scale}px`,
    left: `${imageElement.pos.y * scale}px`,
    width: `${imageElement.size.width * scale}px`,
    height: `${imageElement.size.height * scale}px`,
  };

  return <img style={imageObjectStyles} src={`data:image/jpeg;base64, ${imageElement.url}`} />;
}

export { ImageElementFunc };
