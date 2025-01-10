import { useState, useEffect } from "react";

type ResizeHandle = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "left" | "right" | "bottom";

type UseResizableProps = {
  initialSize: { width: number; height: number };
  onResize: (newSize: { width: number; height: number }) => void;
  onResizeEnd?: () => void;
};

export function useResizable({ initialSize, onResize, onResizeEnd }: UseResizableProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle | null>(null);
  const [size, setSize] = useState(initialSize);

  // Сброс размера при изменении initialSize
  useEffect(() => {
    setSize(initialSize);
  }, [initialSize]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isResizing || !resizeHandle) return;

      let newWidth = size.width;
      let newHeight = size.height;

      if (resizeHandle.includes("right")) {
        newWidth += e.movementX;
      }
      if (resizeHandle.includes("left")) {
        newWidth += e.movementX;
      }
      if (resizeHandle.includes("bottom")) {
        newHeight += e.movementY;
      }
      if (resizeHandle.includes("top")) {
        newHeight += e.movementY;
      }

      const newSize = {
        width: Math.max(20, newWidth),
        height: Math.max(20, newHeight),
      };

      setSize(newSize);
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
  }, [isResizing, resizeHandle, size, onResize, onResizeEnd]);

  function onResizeStart(handle: ResizeHandle) {
    setIsResizing(true);
    setResizeHandle(handle);
  }

  return {
    size,
    isResizing,
    onResizeStart,
  };
}
