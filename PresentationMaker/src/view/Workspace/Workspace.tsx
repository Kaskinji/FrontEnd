import { CSSProperties } from "react";
import { SlideType, TextElement, ImageElement } from "../../entities/Presentation.ts";
import styles from "./Workspace.module.css";
import { dispatch, updateElementPosition } from "../../store/editor.ts";

type WorkspaceProps = {
  slide: SlideType;
};

function Workspace({ slide }: WorkspaceProps) {
  function onDragStart(e: React.DragEvent, elementId: string) {
    e.dataTransfer.setData("elementId", elementId);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault(); // Необходимо для разрешения сброса
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const elementId = e.dataTransfer.getData("elementId");
    const newX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const newY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    // Отправляем обновление через dispatch
    dispatch(updateElementPosition, {
      slideId: slide.id,
      elementId,
      newPos: { x: newX, y: newY },
    });
  }

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
        background: slide.background || "#ffffff", // Цвет фона
        backgroundImage: slide.background ? `url(${slide.background})` : undefined, // Фоновое изображение
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {slide.elements.map((element) => {
        const elementStyles: CSSProperties = {
          position: "absolute",
          top: `${element.pos.y}px`,
          left: `${element.pos.x}px`,
        };

        if (element.type === "text") {
          const textElement = element as TextElement;
          return (
            <p
              key={element.id}
              style={elementStyles}
              draggable
              onDragStart={(e) => onDragStart(e, element.id)}
            >
              {textElement.text}
            </p>
          );
        }

        if (element.type === "image") {
          const imageElement = element as ImageElement;
          return (
            <img
              key={element.id}
              src={`data:image/jpeg;base64, ${imageElement.url}`}
              style={{
                ...elementStyles,
                width: `${imageElement.size.width}px`,
                height: `${imageElement.size.height}px`,
              }}
              draggable
              onDragStart={(e) => onDragStart(e, element.id)}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export { Workspace };
