import { Id } from "./Presentation";
import { Presentation } from "./Presentation";

export type SelectionType = {
    selectedObjectId: Id;
};

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType,
}