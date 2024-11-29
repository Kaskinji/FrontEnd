import { EditorType } from "../../entities/SelectionType"
import { SlideType } from "../../entities/Presentation"


function addSlide(editor: EditorType, newSlide: SlideType): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides,
                newSlide
            ]
        }
    }
}

export {
    addSlide,
}