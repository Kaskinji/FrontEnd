import {
    CreatePresentation,
    EditName,
    CreateSlide,
    EditBackground,
    AddObject,
    EditTextValue,
    EditElementPosition,
    EditElementSize,
    addSlide,
    Presentation,
    SlideType,
    TextElement,
    ImageElement,
  } from "../../entities/Presentation";
  import { v4 as uuid } from "uuid";
  
  describe("Presentation Editor Functions", () => {
    // Минимальные данные
    const minimalPresentation: Presentation = CreatePresentation();
    const minimalSlide: SlideType = CreateSlide();
    const minimalTextElement: TextElement = {
      id: uuid(),
      pos: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
      type: "text",
      text: "",
      fontFamily: "",
      fontSize: 0,
      fontColor: "",
    };
    const minimalImageElement: ImageElement = {
      id: uuid(),
      pos: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
      type: "image",
      url: "",
    };
  
    // Максимальные данные
    const maximalPresentation: Presentation = {
      title: "Max Presentation",
      slides: [
        {
          id: uuid(),
          elements: [
            {
              id: uuid(),
              pos: { x: 50, y: 50 },
              size: { width: 100, height: 50 },
              type: "text",
              text: "Hello, world!",
              fontFamily: "Arial",
              fontSize: 16,
              fontColor: "#000000",
            } as TextElement,
            {
              id: uuid(),
              pos: { x: 200, y: 150 },
              size: { width: 300, height: 200 },
              type: "image",
              url: "https://example.com/image.png",
            } as ImageElement,
          ],
          background: "#abcdef",
        },
        CreateSlide(),
      ],
    };
  
    const maximalSlide: SlideType = {
      id: uuid(),
      elements: [minimalTextElement, minimalImageElement],
      background: "#123456",
    };
  
    const maximalTextElement: TextElement = {
      id: uuid(),
      pos: { x: 10, y: 20 },
      size: { width: 100, height: 50 },
      type: "text",
      text: "Sample Text",
      fontFamily: "Verdana",
      fontSize: 14,
      fontColor: "#ff0000",
    };
  
    const maximalImageElement: ImageElement = {
      id: uuid(),
      pos: { x: 30, y: 40 },
      size: { width: 200, height: 150 },
      type: "image",
      url: "https://example.com/image.png",
    };
  
    // Тесты функций
    it("CreatePresentation should create a presentation", () => {
      const result = CreatePresentation();
      expect(result).toEqual({ title: "New Presentation", slides: [] });
    });
  
    it("EditName should update the presentation name", () => {
      expect(EditName("", minimalPresentation).title).toBe("New Presentation");
      expect(EditName("Updated", maximalPresentation).title).toBe("Updated");
    });
  
    it("CreateSlide should create a new slide", () => {
      const result = CreateSlide();
      expect(result).toMatchObject({
        elements: [],
        background: "ffffff",
      });
    });
  
    it("EditBackground should update the slide background", () => {
      expect(EditBackground("#000000", minimalSlide).background).toBe("#000000");
      expect(EditBackground("#ffffff", maximalSlide).background).toBe("#ffffff");
    });
  
    it("AddObject should add an element to the slide", () => {
      const result = AddObject(minimalTextElement, minimalSlide);
      expect(result.elements).toHaveLength(1);
  
      const resultMax = AddObject(maximalImageElement, maximalSlide);
      expect(resultMax.elements).toHaveLength(3);
    });
  
    it("EditTextValue should update the text value", () => {
      const result = EditTextValue("New Text", minimalTextElement);
      expect(result.text).toBe("New Text");
  
      const resultMax = EditTextValue("Another Text", maximalTextElement);
      expect(resultMax.text).toBe("Another Text");
    });
  
    it("EditElementPosition should update the position of an element", () => {
      const newPosition = { x: 100, y: 200 };
      const result = EditElementPosition(newPosition, minimalTextElement);
      expect(result.pos).toEqual(newPosition);
  
      const resultMax = EditElementPosition(newPosition, maximalImageElement);
      expect(resultMax.pos).toEqual(newPosition);
    });
  
    it("EditElementSize should update the size of an element", () => {
      const newSize = { width: 500, height: 300 };
      const result = EditElementSize(newSize, minimalTextElement);
      expect(result.size).toEqual(newSize);
  
      const resultMax = EditElementSize(newSize, maximalImageElement);
      expect(resultMax.size).toEqual(newSize);
    });
  
    it("addSlide should add a slide to the presentation", () => {
      const result = addSlide(minimalPresentation.slides, minimalSlide);
      expect(result).toHaveLength(1);
  
      const resultMax = addSlide(maximalPresentation.slides, maximalSlide);
      expect(resultMax).toHaveLength(3);
    });
  });
  