import { EditorType } from "../../entities/SelectionType"


function removeImage(editor: EditorType): EditorType {
    const slideId = editor.slideSelection.selectedSlideId
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id == slideId)

    const elementIndex = editor.presentation.slides[slideIndex].elements.findIndex(element => element.type == "image")

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
    removeImage,
}