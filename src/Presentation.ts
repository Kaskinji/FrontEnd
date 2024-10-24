import { v4 as uuidv4 } from 'uuid';
export type Presentation = {
    title: string;
    slides: Slide[];
  } 

  const CreatePresentation = () => ({
    name: "New Presentation",
    listSlides: [],
  });
  
  type Color = {
    type: "solid"
    color: string;
  };
  
  type BackgroundImage = {
    type: "image";
    url: string; 
  };

  type BackgroundColor = {
      type: "color";
      color: Color;
  }; 

  type BackgroundSlide = BackgroundImage | BackgroundColor;

  type Slide = {
    id: string;
    elements: Element[];
    background: BackgroundSlide,
  }  

  const CreateSlide = () : Slide => ({
    id: uuidv4(),
    listObjects: [],
    background: {type: "color", color: "#000000"},
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
  
  type SlideCollection = Slide[];
  
  type Selection = {
    id: string;
    type: ElementType;
  }
  
  type TextElement = SlideElem & {
     type: 'text';
     text: string;
     fontFamily: string,
     fontSize: number,
     fontColor: string,
  }
  
  type ImageElement = SlideElem & {
    type: 'image',
    src: string,
  }
  
  type ElementType = TextElement | ImageElement;
  
  function changePresentationName(presentation: Presentation, newTitle: string): Presentation { 
    if (newTitle.trim() == "") {
        return {...presentation, title: "New Presentation"};
    }
    return {...presentation, title: newTitle};
  }
  
  function addSlide(slideCollection: SlideCollection, newSlide: Slide): SlideCollection {
    return [...slideCollection, newSlide];
  }
  
  function removeSlide(slideCollection: SlideCollection, slideId: string): SlideCollection {
    return slideCollection.filter(slide => slide.id !== slideId);
  }
  
  function changeSlidePosition(slideCollection: SlideCollection, slideId: string, newPosition: number): SlideCollection {
    return slideCollection.map(slide => slide.id === slideId ? {...slide, position: newPosition} : slide);
  }
  
  function addElementToSlide(slide: Slide, newElement: Element): Slide {
    return {...slide, elements: [...slide.elements, newElement]};
  }  
  
  function removeElementFromSlide(slide: Slide, elementId: string): Slide {
    return {...slide, elements: slide.elements.filter(element => element.id !== elementId)};
  }
  
  function changeElementPosition(slide: Slide, elementId: string, newPosition: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(element => element.id === elementId ? {...element, position: newPosition} : element)
    };
  }
  
  function changeElementSize(slide: Slide, elementId: string, newSize: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(element => element.id === elementId ? {...element, size: newSize} : element)
    };
  }
  
  function changeTextContent(slide: Slide, textElementId: string, newText: string): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, content: newText} : element)
    };
  }
  
  function changeTextSize(slide: Slide, textElementId: string, newSize: number): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, textSize: newSize} : element)
    };
  }
  
  function changeFontFamily(slide: Slide, textElementId: string, newFontFamily: string): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, fontFamily: newFontFamily} : element)
    };
  }
  
  function changeSlideBackground(slide: Slide, newBackground: BackgroundSlide): Slide {
    return {...slide, background: newBackground};
  }

  export {
    changePresentationName, changeSlidePosition, CreatePresentation
  }