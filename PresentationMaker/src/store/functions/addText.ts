import { TextElement } from "../../entities/Presentation"
import { EditorType } from "../../entities/SelectionType"


function addText(editor: EditorType, newText: TextElement): EditorType {


    const addTextSlideId = editor.selection.selectedObjectId
    const addTextSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == addTextSlideId)

    const newSlides = [...editor.presentation.slides]
    newSlides[addTextSlideIndex] = {...editor.presentation.slides[addTextSlideIndex], 
        elements: [...editor.presentation.slides[addTextSlideIndex].elements, newText]}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    addText,
}