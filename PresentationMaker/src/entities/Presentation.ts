import { v4 as uuidv4 } from "uuid";
export type Presentation = {
  title: string;
  slides: Slide[];
};

const CreatePresentation = (): Presentation => ({
  title: "New Presentation",
  slides: [],
});

type Color = {
  type: "solid";
  color: string;
};

type BackgroundImage = {
  type: "image";
  url: string;
};

type BackgroundColor = {
  type: "color";
  color: string;
};

export type BackgroundSlide = BackgroundImage | BackgroundColor;

export type SlideType = {
  id: string;
  elements: ElementType[];
  background: BackgroundSlide;
};

const CreateSlide = (): SlideType => ({
  id: uuidv4(),
  elements: [],
  background: { type: "color", color: "#000000" },
});

type SlideElem = {
  id: string;
  pos: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    heigth: number;
  };
};

type SlideCollection = SlideType[];

export type Selection = {
  selectionObjectId: string;
};

export type Text = SlideElem & {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
};

export type ImageElement = SlideElem & {
  type: "image";
  src: string;
};

type ElementType = TextElement | ImageElement;

const changePresentationName = (presentation: Presentation, newTitle: string): Presentation => {
  if (newTitle.trim() == "") {
    return { ...presentation, title: "New Presentation" };
  }
  return { ...presentation, title: newTitle };
};

const addSlide = (slideCollection: SlideCollection, newSlide: SlideType): SlideCollection => {
  return [...slideCollection, newSlide];
};

const removeSlide = (slideCollection: SlideCollection, slideId: string): SlideCollection => {
  return slideCollection.filter((slide) => slide.id !== slideId);
};

const changeSlidePosition = (
  slideCollection: SlideCollection,
  slideId: string,
  newPosition: number,
): SlideCollection => {
  return slideCollection.map((slide) => (slide.id === slideId ? { ...slide, position: newPosition } : slide));
};

const addElementToSlide = (slide: SlideType, newElement: Element): SlideType => {
  return { ...slide, elements: [...slide.elements, newElement] };
};

const removeElementFromSlide = (slide: SlideType, elementId: string): SlideType => {
  return { ...slide, elements: slide.elements.filter((element) => element.id !== elementId) };
};

const changeElementPosition = (slide: SlideType, elementId: string, newPosition: number): SlideType => {
  return {
    ...slide,
    elements: slide.elements.map((element) =>
      element.id === elementId ? { ...element, position: newPosition } : element,
    ),
  };
};

const changeElementSize = (slide: SlideType, elementId: string, newSize: number): SlideType => {
  return {
    ...slide,
    elements: slide.elements.map((element) => (element.id === elementId ? { ...element, size: newSize } : element)),
  };
};

const changeTextContent = (slide: SlideType, textElementId: string, newText: string): SlideType => {
  return {
    ...slide,
    elements: slide.elements.map((element) =>
      element.id === textElementId ? { ...element, content: newText } : element,
    ),
  };
};

const changeTextSize = (slide: SlideType, textElementId: string, newSize: number): SlideType => {
  return {
    ...slide,
    elements: slide.elements.map((element) =>
      element.id === textElementId ? { ...element, textSize: newSize } : element,
    ),
  };
};

const changeFontFamily = (slide: SlideType, textElementId: string, newFontFamily: string): SlideType => {
  return {
    ...slide,
    elements: slide.elements.map((element) =>
      element.id === textElementId ? { ...element, fontFamily: newFontFamily } : element,
    ),
  };
};

const changeSlideBackground = (slide: SlideType, newBackground: BackgroundSlide): SlideType => {
  return { ...slide, background: newBackground };
};

export { changePresentationName, changeSlidePosition, CreatePresentation, CreateSlide, changeSlideBackground };
