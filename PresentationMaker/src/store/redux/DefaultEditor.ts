import { EditorType, SelectionType } from "../../entities/SelectionType"
import { CreateSlide } from "../../entities/Presentation"

const slide = CreateSlide()
const defaultEditor: EditorType = {
    presentation: {
        title: 'Ваша презентация',
        slides: [slide]
    },
    slideSelection: {
        type: SelectionType.Slide,
        selectedSlideId: slide.id,
    },
    objectSelection: {
        type: SelectionType.Object,
        selectedObjectId: '',
    }
}

export {
    defaultEditor
}