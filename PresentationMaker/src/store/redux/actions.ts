import { TextElement, ImageElement,  } from "../../entities/Presentation"
import { EditorType, SelectionObject, SelectionSlide } from "../../entities/SelectionType"
import { SlideType } from "../../entities/Presentation"

export enum ActionType {
    Add_Slide = 'addSlide',
    Remove_Slide = 'removeSlide',
    Add_Text = 'addText',
    Add_Image = 'addImage',
    Remove_Text = 'removeText',
    Update_Font_Color_Action = 'updateFontColor',
    Update_Font_Family_Action = 'updateFontFamily',
    Update_Font_Size_Action = 'updateFontSize',
    Update_Font_Formatting_Action = 'updateFontFormatting',
    Remove_Image = 'removeImage',
    Edit_Background = 'editBackground',
    Edit_Name = 'editName',
    Update_Position = 'updatePosition',
    Update_Size = 'updateSize',
    Update_Text = 'updateText',
    Update_Slides = 'updateSlides',
    Set_Selection_Slide = 'setSelectionSlide',
    Set_Selection_Object = 'setSelectionObject',
    Set_Editor = 'setEditor',
}

type AddSlideAction = {
    type: ActionType.Add_Slide,
    payload: SlideType
}

type RemoveSlideAction = {
    type: ActionType.Remove_Slide,
}

type AddTextAction = {
    type: ActionType.Add_Text,
    payload: TextElement,
}

type AddImageAction = {
    type: ActionType.Add_Image,
    payload: ImageElement,
}

type RemoveTextAction = {
    type: ActionType.Remove_Text,
}

type RemoveImageAction = {
    type: ActionType.Remove_Image,
}

type EditBackgroundAction = {
    type: ActionType.Edit_Background,
    payload: string,
}

type EditNameAction = {
    type: ActionType.Edit_Name,
    payload: string,
}

export type SetSelectionActionSlide = {
    type: ActionType.Set_Selection_Slide,
    payload: SelectionSlide,
}

export type SetSelectionActionObject = {
    type: ActionType.Set_Selection_Object,
    payload: SelectionObject,
}

type SetEditorAction = {
    type: ActionType.Set_Editor,
    payload: EditorType
}

export type EditorAction = 
    AddSlideAction | RemoveSlideAction | AddTextAction | 
    AddImageAction | RemoveTextAction | RemoveImageAction | EditBackgroundAction | EditNameAction | 
    SetSelectionActionSlide | SetSelectionActionObject | SetEditorAction