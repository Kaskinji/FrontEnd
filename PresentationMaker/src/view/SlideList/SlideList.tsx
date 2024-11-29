import { SlideType } from "../../entities/Presentation.ts";
import { SelectionType } from "../../entities/SelectionType.ts"
import { Slide } from "../Slide/Slide.tsx";
import styles from "./SlideList.module.css";

type SlideListProps = {
  slideList: SlideType[];
  selection: SelectionType;
};

function SlideList({ slideList, selection }: SlideListProps) {
  return (
    <div className={styles.slideList}>
      {slideList.map((slide) => (
        <div key={slide.id}>

          <Slide slide={slide} scale={0.2} isSelected={slide.id == selection.selectedSlideId} className={styles.item + ' ' + slide.background} />

        </div>
      ))}
    </div>
  );
}

export { SlideList };
