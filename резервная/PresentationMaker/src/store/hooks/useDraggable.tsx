import { useState } from "react";
import { dispatch } from "../editor";
import { updateElementPosition } from "../editor";

type UseDraggableProps = {
  elementId: string;
  slideId: string;
  initialPos: { x: number; y: number };
  scale?: number;
};

function useDraggable({ elementId, slideId, initialPos, scale = 1 }: UseDraggableProps) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onDragStart(e: React.DragEvent) {
    setDragging(true);
    setOffset({
      x: e.clientX - initialPos.x * scale,
      y: e.clientY - initialPos.y * scale,
    });
    e.dataTransfer.setData("text/plain", elementId);
  }

  function onDragEnd(e: React.DragEvent) {
    setDragging(false);

    const newX = (e.clientX - offset.x) / scale;
    const newY = (e.clientY - offset.y) / scale;

    dispatch(updateElementPosition, {
      slideId,
      elementId,
      newPos: { x: newX, y: newY },
    });
  }

  return { dragging, onDragStart, onDragEnd };
}

export { useDraggable };
