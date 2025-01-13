import { ActionType } from "./actions";
import { ImageElement, SlideType, TextElement } from "../../entities/Presentation";
import { SelectionSlide, SelectionObject } from "../../entities/SelectionType";
import { EditorType } from "../../entities/SelectionType";

function addSlide(slide: SlideType) {
    return {
        type: ActionType.Add_Slide,
        payload: slide
    }
}

function removeSlide() {
    return {
        type: ActionType.Remove_Slide,
    }
}

function addText(text: TextElement) {
    return {
        type: ActionType.Add_Text,
        payload: text,
    }
}

function removeText() {
    return {
        type: ActionType.Remove_Text,
    }
}


function addImage(image: ImageElement) {
    return {
        type: ActionType.Add_Image,
        payload: image,
    }
}

function removeImage() {
    return {
        type: ActionType.Remove_Image,
    }
}

function editBackground(background: string) {
    return {
        type: ActionType.Edit_Background,
        payload: background,
    }
}

function changePresentationName(name: string) {
    return {
        type: ActionType.Edit_Name,
        payload: name,
    }
}

function setSelectionSlide(newSelectionSlide: SelectionSlide) {
    return {
        type: ActionType.Set_Selection_Slide,
        payload: newSelectionSlide,
    }
}

function setSelectionObject(newSelectionObject: SelectionObject) {
    return {
        type: ActionType.Set_Selection_Object,
        payload: newSelectionObject,
    }
}

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.Set_Editor,
        payload: newEditor,
    }
}


export {
    addSlide, removeSlide,
    addText, removeText,
    addImage, removeImage,
    editBackground, changePresentationName,
    setSelectionSlide,
    setSelectionObject, setEditor
}