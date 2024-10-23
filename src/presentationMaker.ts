type Presentation = {
    title: string;
    slides: Slide[];
    background: string;
  }

type Color = {
    type: "solid"
    color: string;
};

type Image = {
    type: "image"
    src: string;
};

type Slide = {
    id: number;
    elements: Element[];
}  

type SlideObj = {
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
    id: number;
    type: ElementType;
  }

type ElementType = 'text' | 'image';

function changePresentationName(presentation: Presentation, newTitle: string): Presentation { 
    return {...presentation, title: newTitle};
}

function addSlide(slideCollection: SlideCollection, newSlide: Slide): SlideCollection {
    return [...slideCollection, newSlide];
}

function removeSlide(slideCollection: SlideCollection, slideId: number): SlideCollection {
    return slideCollection.filter(slide => slide.id !== slideId);
}

function changeSlidePosition(slideCollection: SlideCollection, slideId: number, newPosition: number): SlideCollection {
    return slideCollection.map(slide => slide.id === slideId ? {...slide, position: newPosition} : slide);
  }

function addElementToSlide(slide: Slide, newElement: Element): Slide {
    return {...slide, elements: [...slide.elements, newElement]};
}  

function removeElementFromSlide(slide: Slide, elementId: number): Slide {
    return {...slide, elements: slide.elements.filter(element => element.id !== elementId)};
  }

function changeElementPosition(slide: Slide, elementId: number, newPosition: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(element => element.id === elementId ? {...element, position: newPosition} : element)
    };
}

function changeElementSize(slide: Slide, elementId: number, newSize: number): Slide {
    return {
        ...slide,
        elements: slide.elements.map(element => element.id === elementId ? {...element, size: newSize} : element)
    };
}

function changeTextContent(slide: Slide, textElementId: number, newText: string): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, content: newText} : element)
    };
}

function changeTextSize(slide: Slide, textElementId: number, newSize: number): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, textSize: newSize} : element)
    };
}

function changeFontFamily(slide: Slide, textElementId: number, newFontFamily: string): Slide {
    return {
      ...slide,
      elements: slide.elements.map(element => element.id === textElementId ? {...element, fontFamily: newFontFamily} : element)
    };
  }
 
function changeSlideBackground(presentation: Presentation, newBackground: string): Presentation {
    return {...presentation, background: newBackground};
}