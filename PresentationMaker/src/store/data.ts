import { Presentation, SlideType } from "../entities/Presentation.ts";
import { EditorType, SelectionType } from "../entities/SelectionType.ts";
import { TextObject } from "../view/TextElement.tsx";

const slide1: SlideType = {
  id: "slide-1",
  elements: [
    
    {
      id: "slide-object-2",
      pos: { x: 10, y: 10 },
      size: { width: 500, height: 500 },
      type: "image",
      url: "ссылка"    },
    {
      id: "slide-object-1",
      pos: { x: 10, y: 10 },
      size: { width: 1, height: 100 },
      type: "text",
      text: "Прив!",
      fontFamily: "Roboto",
      fontSize: TextObject.fontSize,
      fontColor: "#000",
    },
  ],
  background: "#ffffff",
};

const slide2: SlideType = {
  id: "slide-2",
  elements: [
    {
      id: "slide-object-1",
      pos: { x: 10, y: 10 },
      size: { width: 10, height: 10 },
      type: "text",
      text: "Второй слайд",
      fontFamily: "Roboto",
      fontSize: TextObject.fontSize,
      fontColor: "#000000",
    },
  ],
  background: "#000000",
};

const presentation: Presentation = {
  title: "Моя презентация",
  slides: [slide1, slide2],
};

const editor: EditorType = {
  presentation,
  slideSelection: {
    type: SelectionType.Slide,
    selectedSlideId: presentation.slides[0].id,
    
  },
  objectSelection: {
    type: SelectionType.Object,
    selectedObjectId: ''

  }
};

export { editor };
