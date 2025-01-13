import { SlideType } from "../../entities/Presentation.ts";
import { SelectionType } from "../../entities/SelectionType.ts";
import { Slide } from "../Slide/Slide.tsx";
import styles from "./SlideList.module.css";
import { dispatch } from "../../store/editor.ts";
import { useDraggableList } from "../../store/hooks/useDraggableList.tsx";
import { useAppSelector } from "../../store/hooks/useAppSelector.ts";
import { useActions } from "../../store/hooks/useActions.ts";


function SlideList() {

  const slideList = useAppSelector(editor => editor.presentation.slides);
  const editor = useAppSelector(editor => editor)
  const {setSelectionSlide} = useActions()

  const { onDragStart, onDragOver, onDrop } = useDraggableList<SlideType>({
    items: slideList,
    onReorder: (newOrder) => {
      dispatch((editor) => ({
        ...editor,
        presentation: {
          ...editor.presentation,
          slides: newOrder,
        },
      }), newOrder);
    },
  });

  function onSlideClick(slideId: string) {
    setSelectionSlide({ selectedSlideId: slideId, type: SelectionType.Slide });
    console.log(slideId)
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
            isSelected={slide.id === editor.slideSelection.selectedSlideId}
          />
        </div>
      ))}
    </div>
  );
}

export { SlideList };
