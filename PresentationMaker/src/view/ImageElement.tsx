import { CSSProperties } from "react";
import { ImageElement } from "../entities/Presentation.ts";
import { useDraggable } from "../store/hooks/useDraggable.tsx"

type ImageElementProps = {
  imageElement: ImageElement;
  scale?: number;
};

function ImageObject({ imageElement, scale = 1 }: ImageElementProps) {
  const { dragging, onDragStart, onDragEnd } = useDraggable({
    elementId: imageElement.id,
    slideId: imageElement.id,
    initialPos: imageElement.pos,
    scale,
  });

  const imageObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${imageElement.pos.y * scale}px`,
    left: `${imageElement.pos.x * scale}px`,
    width: `${imageElement.size.width * scale}px`,
    height: `${imageElement.size.height * scale}px`,
    cursor: dragging ? "grabbing" : "grab",
  };

  return (
    <img
      src={`data:image/jpeg;base64, ${imageElement.url}`}
      style={imageObjectStyles}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

export { ImageObject };
