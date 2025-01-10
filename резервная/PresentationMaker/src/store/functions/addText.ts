import { TextElement } from "../../entities/Presentation";
import { EditorType } from "../../entities/SelectionType";

// Функция для добавления текста на слайд
function addText(editor: EditorType, newText: TextElement): EditorType {
    if ( !editor.slideSelection.selectedSlideId) {
        console.error("No slide selected for adding text");
        return editor;
    }

    // Получаем ID выбранного слайда
    const selectedSlideId = editor.slideSelection.selectedSlideId;
    const selectedSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id === selectedSlideId
    );

    if (selectedSlideIndex === -1) {
        console.error("Slide not found for adding text");
        return editor;
    }

    // Обновляем слайды
    const updatedSlides = [...editor.presentation.slides];
    updatedSlides[selectedSlideIndex] = {
        ...editor.presentation.slides[selectedSlideIndex],
        elements: [
            ...editor.presentation.slides[selectedSlideIndex].elements,
            newText, // Добавляем новый текст
        ],
    };

    // Возвращаем обновленный редактор
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}

export { addText };
