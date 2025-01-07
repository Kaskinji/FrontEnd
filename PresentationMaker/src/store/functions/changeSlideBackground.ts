import { EditorType } from "../../entities/SelectionType.ts";


function changeSlideBackground(editor: EditorType, newBackground: string): EditorType {

    const editBackgroundSlideId = editor.slideSelection.selectedSlideId
    const editBackgroundSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editBackgroundSlideId)

    const newSlides = [...editor.presentation.slides]
    newSlides[editBackgroundSlideIndex] = {...editor.presentation.slides[editBackgroundSlideIndex], background: newBackground}
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export {
    changeSlideBackground,
}