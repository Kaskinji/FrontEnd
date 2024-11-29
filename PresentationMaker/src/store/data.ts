import { Presentation, SlideType } from "../entities/Presentation.ts";
import { EditorType } from "../entities/SelectionType.ts";

const slide1: SlideType = {
  id: "slide-1",
  elements: [
    
    {
      id: "slide-object-2",
      pos: { x: 0, y: 0 },
      size: { width: 1100, height: 700 },
      type: "image",
    },
    {
      id: "slide-object-1",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 20 },
      type: "text",
      text: "Привет!",
      fontFamily: "Roboto",
      fontSize: 100,
      fontColor: "#000000",
    },
  ],
  background: "#00ff00",
};

const slide2: SlideType = {
  id: "slide-2",
  elements: [
    {
      id: "slide-object-3",
      pos: { x: 10, y: 10 },
      size: { width: 100, height: 20 },
      type: "text",
      text: "Второй слайд",
      fontFamily: "Roboto",
      fontSize: 20,
      fontColor: "#000000",
    },
  ],
  background: "#ff00ff",
};

const presentation: Presentation = {
  title: "Моя презентация",
  slides: [slide1, slide2],
};

const editor: EditorType = {
  presentation,
  selection: {
    selectedObjectId: presentation.slides[0].id,
  },
};

export { editor };