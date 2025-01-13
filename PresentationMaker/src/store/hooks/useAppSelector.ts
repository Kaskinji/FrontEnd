import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EditorReducer } from "../redux/EditorReducer";

type RootState = ReturnType<typeof EditorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector
}