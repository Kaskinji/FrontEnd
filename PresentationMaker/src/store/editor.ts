import {editor} from './data.ts'
import { EditorType } from '../entities/SelectionType.ts'

type Handler = () => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModifyFn = (edtor: EditorType, payload: any) => EditorType

let _editor = editor
let _handler: Handler | null = null

function getEditor() {
    return _editor
}

function setEditor(newEditor: EditorType) {
    _editor = newEditor
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dispatch(modifyFn: ModifyFn, payload?: any): void {
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Handler): void {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}