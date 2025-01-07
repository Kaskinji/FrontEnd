import { useState } from "react";
import { dispatch } from "../editor";

type ResizeDirection = 
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

type UseResizableProps = {
  elementId: string;
  slideId: string;
  initialSize: { width: number; height: number };
  initialPos: { x: number; y: number };
  scale?: number;
};

function useResizable({
  elementId,
  slideId,
  initialSize,
  initialPos,
  scale = 1,
}: UseResizableProps) {
  const [resizing, setResizing] = useState(false);
  const [size, setSize] = useState(initialSize);
  const [pos, setPos] = useState(initialPos);

  function onResizeStart(e: React.MouseEvent, direction: ResizeDirection) {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startXPos = pos.x;
    const startYPos = pos.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      const deltaY = (moveEvent.clientY - startY) / scale;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      switch (direction) {
        case "top-left":
          newWidth -= deltaX;
          newHeight -= deltaY;
          newX += deltaX;
          newY += deltaY;
          break;
        case "top":
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case "top-right":
          newWidth += deltaX;
          newHeight -= deltaY;
          newY += deltaY;
          break;
        case "left":
          newWidth -= deltaX;
          newX += deltaX;
          break;
        case "right":
          newWidth += deltaX;
          break;
        case "bottom-left":
          newWidth -= deltaX;
          newHeight += deltaY;
          newX += deltaX;
          break;
        case "bottom":
          newHeight += deltaY;
          break;
        case "bottom-right":
          newWidth += deltaX;
          newHeight += deltaY;
          break;
      }

      setSize({
        width: Math.max(newWidth, 20),
        height: Math.max(newHeight, 20),
      });
      setPos({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      setResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      dispatch(updateElementSize, {
        slideId,
        elementId,
        newSize: size,
        newPos: pos,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return { resizing, size, pos, onResizeStart };
}

export { useResizable };
