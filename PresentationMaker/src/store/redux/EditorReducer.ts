import { addImage } from "../functions/addImage";
import { addSlide } from "../functions/addSlide";
import { addText } from "../functions/addText";
import { changeSlideBackground } from "../functions/changeSlideBackground";
import { removeImage } from "../functions/removeImageElement";
import { removeSlide } from "../functions/removeSlide";
import { removeText } from "../functions/removeTextContent";
import { setSelectionObject } from "../functions/SetSelectionObject";
import { setSelectionSlide } from "../functions/SetSelectionSlide";
import { EditorType } from "../../entities/SelectionType";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "./DefaultEditor";
import { changePresentationName } from "../functions/changePresentationName";

export function EditorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.Add_Slide:
            return addSlide(editor, action.payload);
        case ActionType.Remove_Slide:
            return removeSlide(editor);
        case ActionType.Add_Text:
            return addText(editor, action.payload);
        case ActionType.Add_Image:
            return addImage(editor, action.payload);
        case ActionType.Remove_Text:
            return removeText(editor);
        case ActionType.Remove_Image:
            return removeImage(editor);
        case ActionType.Edit_Background:
            return changeSlideBackground(editor, action.payload);
        case ActionType.Edit_Name:
            return changePresentationName(editor, action.payload);
        case ActionType.Set_Selection_Object:
            return setSelectionObject(editor, action.payload);
        case ActionType.Set_Selection_Slide:
            return setSelectionSlide(editor, action.payload);
        case ActionType.Set_Editor:
            return action.payload;
        default:
            return editor;
    }
}