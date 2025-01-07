import { EditorType, SelectionSlide } from "../../entities/SelectionType"


function setSelectionSlide(editor: EditorType, newSelectionSlide: SelectionSlide): EditorType {
    return {
        ...editor,
        slideSelection: newSelectionSlide,
        objectSelection: {
            ...editor.objectSelection
        }
    }
}

export {
    setSelectionSlide,
}