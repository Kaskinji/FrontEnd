import { useState, useEffect } from "react";

type ResizeHandle =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "left"
  | "right"
  | "bottom";

type UseResizableProps = {
  initialSize: { width: number; height: number };
  initialPosition: { x: number; y: number };
  onResize: (newSize: { width: number; height: number; x: number; y: number }) => void;
  onResizeEnd?: () => void;
};

export function useResizable({
  initialSize,
  initialPosition,
  onResize,
  onResizeEnd,
}: UseResizableProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle | null>(null);
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setSize(initialSize);
    setPosition(initialPosition);
  }, [initialSize, initialPosition]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isResizing || !resizeHandle) return;

      let { width, height } = size;
      let { x, y } = position;

      if (resizeHandle.includes("right")) {
        width += e.movementX;
      }
      if (resizeHandle.includes("left")) {
        width -= e.movementX;
        x += e.movementX;
      }
      if (resizeHandle.includes("bottom")) {
        height += e.movementY;
      }
      if (resizeHandle.includes("top")) {
        height -= e.movementY;
        y += e.movementY;
      }

      const newSize = {
        width: Math.max(20, width),
        height: Math.max(20, height),
        x,
        y,
      };

      setSize({ width: newSize.width, height: newSize.height });
      setPosition({ x: newSize.x, y: newSize.y });
      onResize(newSize);
    }

    function onMouseUp() {
      if (isResizing) {
        setIsResizing(false);
        setResizeHandle(null);
        if (onResizeEnd) onResizeEnd();
      }
    }

    if (isResizing) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing, resizeHandle, size, position, onResize, onResizeEnd]);

  function onResizeStart(handle: ResizeHandle) {
    setIsResizing(true);
    setResizeHandle(handle);
  }

  return {
    size,
    position,
    isResizing,
    onResizeStart,
  };
}
