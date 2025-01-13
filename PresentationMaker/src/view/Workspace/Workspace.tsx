import { useState } from "react";
import { CSSProperties } from "react";
import { TextElement} from "../../entities/Presentation.ts";
import styles from "./Workspace.module.css";
import { dispatch, updateElementPosition } from "../../store/editor.ts";
import { useAppSelector } from "../../store/hooks/useAppSelector.ts";


type ResizeHandle =
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

type ElementResizeState = {
  [elementId: string]: { width: number; height: number; x: number; y: number };
};

function Workspace() {

  const editor = useAppSelector(editor => editor);
  const selectedObjectIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.slideSelection.selectedSlideId);
  const selectedSlide = editor.presentation.slides[selectedObjectIndex];
  const [resizeStates, setResizeStates] = useState<ElementResizeState>({});
  const [activeAction, setActiveAction] = useState<{
    elementId: string;
    handle: ResizeHandle | "move" | null;
  } | null>(null);

  function onResizeOrMoveStart(
    e: React.MouseEvent,
    elementId: string,
    handle: ResizeHandle | "move" = "move"
  ) {
    e.stopPropagation();
    setActiveAction({ elementId, handle });

    const element = selectedSlide.elements.find((el) => el.id === elementId);
    if (!element) return;

    setResizeStates((prev) => ({
      ...prev,
      [elementId]: { ...element.size, x: element.pos.x, y: element.pos.y },
    }));
  }

  function onMouseMove(e: MouseEvent) {
    if (!activeAction) return;

    const { elementId, handle } = activeAction;
    const element = selectedSlide.elements.find((el) => el.id === elementId);
    if (!element) return;

    const current = resizeStates[elementId];

    let newWidth = current.width;
    let newHeight = current.height;
    let newX = current.x;
    let newY = current.y;

    if (handle === "move") {
      // Перемещение элемента
      newX += e.movementX;
      newY += e.movementY;
    } else {
      // Изменение размеров
      if (handle.includes("right")) {
        newWidth += e.movementX;
      }
      if (handle.includes("left")) {
        newWidth -= e.movementX;
        newX += e.movementX;
      }
      if (handle.includes("bottom")) {
        newHeight += e.movementY;
      }
      if (handle.includes("top")) {
        newHeight -= e.movementY;
        newY += e.movementY;
      }
    }

    setResizeStates((prev) => ({
      ...prev,
      [elementId]: {
        width: Math.max(20, newWidth),
        height: Math.max(20, newHeight),
        x: newX,
        y: newY,
      },
    }));
  }

  function onMouseUp() {
    if (!activeAction) return;

    const { elementId } = activeAction;
    const newState = resizeStates[elementId];
    if (!newState) return;

    dispatch(updateElementPosition, {
      slideId: selectedSlide.id,
      elementId,
      newPos: { x: newState.x, y: newState.y },
      size: { width: newState.width, height: newState.height },
    });

    setActiveAction(null);
  }

  function renderResizeHandles(elementId: string) {
    const handles: ResizeHandle[] = [
      "top-left",
      "top",
      "top-right",
      "right",
      "bottom-right",
      "bottom",
      "bottom-left",
      "left",
    ];

    return handles.map((handle) => (
      <div
        key={handle}
        className={`${styles.resizeHandle} ${styles[handle]}`}
        onMouseDown={(e) => onResizeOrMoveStart(e, elementId, handle)}
      />
    ));
  }

  return (
    <div
      className={styles.workspace}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        position: "relative",
        width: "1300px",
        height: "800px",
        overflow: "hidden",
        background: selectedSlide.background || "#ffffff",
        backgroundImage: selectedSlide.background
          ? `url(${selectedSlide.background})`
          : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {selectedSlide.elements.map((element) => {
        const current = resizeStates[element.id] || {
          width: element.size.width,
          height: element.size.height,
          x: element.pos.x,
          y: element.pos.y,
        };

        const elementStyles: CSSProperties = {
          position: "absolute",
          top: `${current.y}px`,
          left: `${current.x}px`,
          width: `${current.width}px`,
          height: `${current.height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: element.type === "text" ? "1px solid lightgray" : undefined,
          cursor: "move",
        };

        return (
          <div
            key={element.id}
            style={elementStyles}
            onMouseDown={(e) => onResizeOrMoveStart(e, element.id, "move")}
          >
            {element.type === "text" && (
              <p
                style={{
                  margin: 0,
                  fontSize: `${Math.min(current.width, current.height) / 5}px`,
                  wordWrap: "break-word",
                  width: "100%",
                  height: "100%",
                }}
              >
                {(element as TextElement).text}
              </p>
            )}
            {element.type === "image" && (
              <img
                src={`data:image/jpeg;base64, ${element.url}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}

            {renderResizeHandles(element.id)}
          </div>
        );
      })}
    </div>
  );
}

export { Workspace };
