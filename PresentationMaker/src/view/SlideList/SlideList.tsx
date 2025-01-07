import { SlideType } from "../../entities/Presentation.ts";
import { SelectionSlide } from "../../entities/SelectionType.ts";
import { Slide } from "../Slide/Slide.tsx";
import styles from "./SlideList.module.css";
import { setSelectionSlide } from "../../store/functions/SetSelectionSlide.ts";
import { dispatch } from "../../store/editor.ts";
import { useDraggableList } from "../../store/hooks/useDraggableList.tsx";

type SlideListProps = {
  slideList: SlideType[];
  selection: SelectionSlide;
};

function SlideList({ slideList, selection }: SlideListProps) {
  const { onDragStart, onDragOver, onDrop } = useDraggableList<SlideType>({
    items: slideList,
    onReorder: (newOrder) => {
      dispatch((editor) => ({
        ...editor,
        presentation: {
          ...editor.presentation,
          slides: newOrder,
        },
      }));
    },
  });

  function onSlideClick(slideId: string) {
    dispatch(setSelectionSlide, { selectedSlideId: slideId });
  }

  return (
    <div className={styles.slideList}>
      {slideList.map((slide, index) => (
        <div
          key={slide.id}
          draggable
          onDragStart={() => onDragStart(index)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(index)}
          onClick={() => onSlideClick(slide.id)}
        >
          <Slide
            slide={slide}
            scale={0.3} // Масштаб для превьюшки
            isSelected={slide.id === selection.selectedSlideId}
          />
        </div>
      ))}
    </div>
  );
}

export { SlideList };
