import { editor } from './data.ts';
import { EditorType } from '../entities/SelectionType.ts';
import { SlideType } from '../entities/Presentation.ts';

type Handler = () => void;
type ModifyFn<T = any> = (editor: EditorType, payload: T) => EditorType;

let _editor = editor;
let _handler: Handler | null = null;

function getEditor() {
    console.log("Current editor state:", _editor); // Проверяем, что редактор обновляется
    return _editor;
}

function setEditor(newEditor: EditorType) {
    _editor = { ...newEditor }; // Создаем новый объект
}

function updateSlides(editor: EditorType, updater: (slide: SlideType) => SlideType): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(updater),
        },
    };
}

// Функция для обновления позиции объекта (текста или изображения) на слайде
function updateElementPosition(editor: EditorType, { slideId, elementId, newPos }: { slideId: string, elementId: string, newPos: { x: number, y: number } }): EditorType {
  const newSlides = editor.presentation.slides.map((slide) => {
      if (slide.id === slideId) {
          const newElements = slide.elements.map((element) => {
              if (element.id === elementId) {
                  return {
                      ...element, // Создаем новый объект элемента
                      pos: newPos, // Обновляем позицию
                  };
              }
              return element; // Возвращаем остальные элементы без изменений
          });
          return {
              ...slide, // Создаем новый объект слайда
              elements: newElements, // Заменяем массив элементов
          };
      }
      return slide; // Возвращаем остальные слайды без изменений
  });

  return {
      ...editor, // Создаем новый объект редактора
      presentation: {
          ...editor.presentation, // Сохраняем остальные свойства презентации
          slides: newSlides, // Заменяем массив слайдов
      },
  };
}

// Функция для обновления размера объекта на слайде
function updateElementSize(editor: EditorType, { slideId, elementId, newSize }: { slideId: string, elementId: string, newSize: { width: number, height: number } }): EditorType {
    return updateSlides(editor, (slide) => {
        if (slide.id === slideId) {
            const newElements = slide.elements.map((element) => {
                if (element.id === elementId) {
                    return {
                        ...element,
                        size: newSize,
                    };
                }
                return element;
            });
            return { ...slide, elements: newElements };
        }
        return slide;
    });
}


function dispatch<T>(modifyFn: ModifyFn<T>, payload: T): void {
    console.log("Dispatching action with payload:", payload);
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}


function addEditorChangeHandler(handler: Handler): void {
    _handler = () => {
        handler(); // Вызов функции обновления состояния
    };
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
    updateElementPosition, // Экспортируем новую функцию
    updateElementSize,     // Экспортируем функцию изменения размера
};

