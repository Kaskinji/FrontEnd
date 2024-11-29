import { ImageElement } from "../../entities/Presentation"
import { EditorType } from "../../entities/SelectionType"

function addImage(editor: EditorType, newImage: ImageElement): EditorType {
    console.log("editor", editor)

    const addTextSlideId = editor.selection.selectedObjectId
    const addTextSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == addTextSlideId)

    const newSlides = [...editor.presentation.slides]
    newSlides[addTextSlideIndex] = {...editor.presentation.slides[addTextSlideIndex], 
        elements: [...editor.presentation.slides[addTextSlideIndex].elements, newImage]}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    addImage,
}