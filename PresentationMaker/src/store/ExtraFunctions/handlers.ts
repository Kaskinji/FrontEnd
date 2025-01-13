import { v4 as uuid } from "uuid";
import { ImageElement, Presentation, TextElement } from "../../entities/Presentation";
import { EditorType } from "../../entities/SelectionType";
import { HistoryType } from "./History";


export const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, editName: (name: string) => void) => {
    editName(event.target.value)
}

export const handleAddSlide = (addSlide: () => void) => {
    addSlide()
}
export const handleRemoveSlide = (removeSlide: () => void) => {
    removeSlide()
}

export const handleAddText = (addText: (text: TextElement) => void) => {
    addText({
        id: uuid(),
        pos: {x: 10, y: 10},
        size: {width: 100, height: 100},
        type: "text",
        fontSize: 100,
        fontFamily: 'Roboto',
        fontColor: '#0000ff',
        text: '',
    })
}

export const handleAddImage = (addImage: (image: ImageElement) => void, image: string) => {
    addImage({
        id: uuid(),
        pos: {x: 400, y: 70},
        size: {width: 200, height: 200},
        type: "image",
        url: image,
    })
}

export const handleRemoveText = (removeText: () => void) => {
    removeText()
}

export const handleRemoveImage = (removeImage: () => void) => {
    removeImage()
}

export const handleEditBackground = (editBackground: (background: string) => void, background: string) => {
    editBackground(background);
};

export const getSelectedObject = (editor: EditorType) => {
    const slide = editor.presentation.listSlides.find(
        (slide) => slide.id === editor.selectionSlide.selectedSlideId
    )
    if (!slide) return null

    return slide.listObjects.find(
        (object) => object.id === editor.selectionObject.selectedObjectId
    )
}



export const handleUndo = (history: HistoryType, setEditor: any) => {
    const newEditor = history.undo()
    if (newEditor) {
        setEditor(newEditor)
    }
}

export const handleRedo = (history: HistoryType, setEditor: any) => {
    const newEditor = history.redo()
    if (newEditor) {
        setEditor(newEditor)
    }
}

export const handleExportToPDF = (presentation: Presentation, exportPresentationToPDF: (presentation: any) => void) => {
    if (!presentation.title || presentation.title.trim() === "") {
        alert("Имя презентации не указано. Используется имя по умолчанию: 'presentation'.")
    }
    exportPresentationToPDF(presentation)
}
