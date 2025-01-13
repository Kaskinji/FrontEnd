import { useDispatch } from "react-redux"
import ActionCreator from "../redux/ActionCreator"
import { bindActionCreators } from "redux"

const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreator, dispatch)
}

export {
    useActions
}