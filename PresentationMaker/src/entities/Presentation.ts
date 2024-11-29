// import { v4 as uuidv4 } from "uuid";
export type Id = string;

export type Presentation = {
  title: string;
  slides: SlideType[];
};


// const CreatePresentation = (): Presentation => ({
//   title: "New Presentation",
//   slides: [],
// });

type BackgroundImage = {
  type: "image";
  url: string;
};

type BackgroundColor = {
  type: "color";
  color: string;
};

export type BackgroundSlide = BackgroundImage | BackgroundColor;

export type SlideElem = {
  id: Id;
  pos: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
};

export type ElementType = TextElement | ImageElement;

export type TextElement = SlideElem & {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
};

export type ImageElement = SlideElem & {
  type: "image";
  url: string;
};

export type SlideType = {
  id: string;
  elements: ElementType[];
  background: string;
};

// const CreateSlide = (): SlideType => ({
//   id: uuidv4(),
//   elements: [],
//   background: "ffffff",
// });



export type SlideCollection = SlideType[];

export type Selection = {
  selectionObjectId: string;
};

export enum FontFormatting {
  bold,
  italic,
  underlined,
}
// const addSlide = (slideCollection: SlideCollection, newSlide: SlideType): SlideCollection => {
//   return [...slideCollection, newSlide];
// };

// const removeSlide = (slideCollection: SlideCollection, slideId: string): SlideCollection => {
//   return slideCollection.filter((slide) => slide.id !== slideId);
// };

// const changeSlidePosition = (
//   slideCollection: SlideCollection,
//   slideId: string,
//   newPosition: number,
// ): SlideCollection => {
//   return slideCollection.map((slide) => (slide.id === slideId ? { ...slide, position: newPosition } : slide));
// };

// const addElementToSlide = (slide: SlideType, newElement: ElementType): SlideType => {
//   return { ...slide, elements: [...slide.elements, newElement] };
// };

// const removeElementFromSlide = (slide: SlideType, elementId: string): SlideType => {
//   return { ...slide, elements: slide.elements.filter((element) => element.id !== elementId) };
// };

// const changeElementPosition = (slide: SlideType, elementId: string, newPosition: number): SlideType => {
//   return {
//     ...slide,
//     elements: slide.elements.map((element) =>
//       element.id === elementId ? { ...element, position: newPosition } : element,
//     ),
//   };
// };

// const changeElementSize = (slide: SlideType, elementId: string, newSize: {width: number, height: number}): SlideType => {
//   return {
//     ...slide,
//     elements: slide.elements.map((element) => (element.id === elementId ? { ...element, size: newSize } : element)),
//   };
// };

// const changeTextContent = (slide: SlideType, textElementId: string, newText: string): SlideType => {
//   return {
//     ...slide,
//     elements: slide.elements.map((element) =>
//       element.id === textElementId ? { ...element, content: newText } : element,
//     ),
//   };
// };

// const changeTextSize = (slide: SlideType, textElementId: string, newSize: number): SlideType => {
//   return {
//     ...slide,
//     elements: slide.elements.map((element) =>
//       element.id === textElementId ? { ...element, textSize: newSize } : element,
//     ),
//   };
// };

// const changeFontFamily = (slide: SlideType, textElementId: string, newFontFamily: string): SlideType => {
//   return {
//     ...slide,
//     elements: slide.elements.map((element) =>
//       element.id === textElementId ? { ...element, fontFamily: newFontFamily } : element,
//     ),
//   };
// };

