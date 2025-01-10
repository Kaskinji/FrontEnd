import { CSSProperties } from "react";
import {
  SlideType,
  TextElement,
  ImageElement,
} from "../../entities/Presentation.ts";
import styles from "./Workspace.module.css";
import { setSelectionObject } from "../../store/functions/SetSelectionObject.ts";
import {
  dispatch,
  updateElementPosition,
} from "../../store/editor.ts";
import { SelectionType } from "../../entities/SelectionType.ts";
import { useResizable } from "../../store/hooks/useResize.tsx";

type WorkspaceProps = {
  slide: SlideType;
};

function Workspace({ slide }: WorkspaceProps) {
  function onDragStart(e: React.DragEvent, elementId: string) {
    e.dataTransfer.setData("elementId", elementId);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("elementId");
    const newX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const newY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    dispatch(updateElementPosition, {
      slideId: slide.id,
      elementId,
      newPos: { x: newX, y: newY },
    });
  }

  function onClickElement(elementId: string) {
    dispatch(setSelectionObject, {
      type: SelectionType.Object,
      selectedObjectId: elementId,
    });
  }

  function onResizeElement(
    elementId: string,
    newSize: { width: number; height: number }
  ) {
    dispatch(updateElementPosition, {
      slideId: slide.id,
      elementId,
      newPos: {
        ...slide.elements.find((el) => el.id === elementId)?.pos!,
        size: newSize,
      },
    });
  }

  console.log("Workspace received slide:", slide);
  return (
    <div
      className={styles.workspace}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        position: "relative",
        width: "1300px",
        height: "800px",
        overflow: "hidden",
        background: slide.background || "#ffffff",
        backgroundImage: slide.background
          ? `url(${slide.background})`
          : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {slide.elements.map((element) => {
        // Проверьте, существует ли у элемента поле `size`
        if (!element.size) {
          console.error(`Element ${element.id} is missing size property.`);
          return null; // Убедитесь, что пропускаете элемент безопасно
        }

        const { size, onResizeStart } = useResizable({
          initialSize: element.size,
          onResize: (newSize) => onResizeElement(element.id, newSize),
        });

        const elementStyles: CSSProperties = {
          position: "absolute",
          top: `${element.pos.y}px`,
          left: `${element.pos.x}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: element.type === "text" ? "1px solid lightgray" : undefined,
        };

        return (
          <div
            key={element.id}
            style={elementStyles}
            draggable
            onDragStart={(e) => onDragStart(e, element.id)}
            onClick={() => onClickElement(element.id)}
          >
            {element.type === "text" && (
              <p
                style={{
                  margin: 0,
                  fontSize: `${Math.min(size.width, size.height) / 5}px`,
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

            {/* Ресайз-точки */}
            <div
              className={styles.resizeHandle}
              style={{ position: "absolute", top: 0, left: 0 }}
              onMouseDown={() => onResizeStart("top-left")}
            />
            <div
              className={styles.resizeHandle}
              style={{ position: "absolute", top: 0, right: 0 }}
              onMouseDown={() => onResizeStart("top-right")}
            />
            <div
              className={styles.resizeHandle}
              style={{ position: "absolute", bottom: 0, left: 0 }}
              onMouseDown={() => onResizeStart("bottom-left")}
            />
            <div
              className={styles.resizeHandle}
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onMouseDown={() => onResizeStart("bottom-right")}
            />
          </div>
        );
      })}
    </div>
  );
}

export { Workspace };
