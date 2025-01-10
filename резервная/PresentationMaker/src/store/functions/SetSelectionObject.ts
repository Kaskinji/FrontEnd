import { EditorType, SelectionObject } from "../../entities/SelectionType"


function setSelectionObject(editor: EditorType, newSelectionObject: SelectionObject): EditorType {
    return {
        ...editor,
        slideSelection: {
            ...editor.slideSelection
        },
        objectSelection: newSelectionObject,
    }
}

export {
    setSelectionObject,
}