import { EditorType, SelectionSlide } from "../../entities/SelectionType"


function setSelectionSlide(editor: EditorType, newSelectionSlide: SelectionSlide): EditorType {
    console.log(editor)
    return {
        ...editor,
        slideSelection: newSelectionSlide,
    }
    
}

export {
    setSelectionSlide,
}