import { Selection } from "../entities/Presentation";
import { SlideType } from "../entities/Presentation";
import { Slide } from "./Slide";

type SlideCollectionProps = {
  slideList: SlideType[];
  selection: Selection;
};

function SlideCollection({ slideList, selection }: SlideCollectionProps) {
  return (
    <div>
      {slideList.map((slide) => (
        <div key={slide.id}>
          <Slide slide={slide} scale={0.2} isSelected={slide.id == selection.selectionObjectId} className={""} />
        </div>
      ))}
    </div>
  );
}

export { SlideCollection };
