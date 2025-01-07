import { EditorType, SelectionType } from "../../entities/SelectionType"

function removeSlide(editor: EditorType): EditorType {
    const removeSlideId = editor.slideSelection.selectedSlideId
    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)

    const newSlides = editor.presentation.slides.filter(slide => slide.id != removeSlideId)

    let newSelectedSlideId = ""
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        slideSelection: {
            type: SelectionType.Slide,
            selectedSlideId: newSelectedSlideId,
        },
        objectSelection: {
            type: SelectionType.Object,
            selectedObjectId: ""
        }
    }
}

export {
    removeSlide,
}