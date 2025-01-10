import { EditorType } from "../../entities/SelectionType.ts";

function changePresentationName(editor: EditorType, newTitle: string): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
}
export {changePresentationName}