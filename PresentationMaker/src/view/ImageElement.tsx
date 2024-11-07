import { CSSProperties } from "react";
import { ImageElement } from "../entities/Presentation";

type ImageObjectProps = {
  imageElement: ImageElement;
  scale?: number;
};

function ImageObject({ imageElement, scale = 1 }: ImageObjectProps) {
  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageElement.pos.y * scale}px`,
    left: `${imageElement.pos.x * scale}px`,
    width: `${imageElement.size.width * scale}px`,
    height: `${imageObject.size.heigth * scale}px`,
  };

  return <img style={imageObjectStyles} src={`data:image/jpeg;base64, ${imageObject.url}`} />;
}

export { ImageObject };
