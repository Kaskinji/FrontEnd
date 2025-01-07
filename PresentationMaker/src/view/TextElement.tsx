import { CSSProperties } from "react";
import { TextElement } from "../entities/Presentation.ts";
import { useDraggable } from "../store/hooks/useDraggable.tsx";

type TextElementProps = {
  textElement: TextElement;
  scale?: number;
  isSelected: boolean;
};

function TextObject({ textElement, isSelected, scale = 1 }: TextElementProps) {
  const { dragging, onDragStart, onDragEnd } = useDraggable({
    elementId: textElement.id,
    slideId: textElement.id,
    initialPos: textElement.pos,
    scale,
  });

  const textObjectStyles: CSSProperties = {
    position: "absolute",
    top: `${textElement.pos.y * scale}px`,
    left: `${textElement.pos.x * scale}px`,
    fontSize: `${textElement.fontSize * scale}px`,
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    cursor: dragging ? "grabbing" : "grab",
    backgroundColor: isSelected ? "rgba(0,0,0,0.1)" : "transparent",
  };

  return (
    <p
      style={textObjectStyles}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {textElement.text}
    </p>
  );
}

export { TextObject };
