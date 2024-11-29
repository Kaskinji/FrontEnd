import { EditorType } from "../../entities/SelectionType";


function removeText(editor: EditorType): EditorType {
    const slideId = editor.selection.selectedObjectId
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.slides[slideIndex].elements.findIndex(element => element.type == "text")

    const newSlides = [...editor.presentation.slides]
    newSlides[slideIndex].elements.splice(elementIndex, 1)
    console.log(newSlides)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}

export {
    removeText,
}