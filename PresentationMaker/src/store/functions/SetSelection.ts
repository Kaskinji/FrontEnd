import { EditorType } from "../../entities/SelectionType"

function setSelection(editor: EditorType, newSelection: Selection): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}