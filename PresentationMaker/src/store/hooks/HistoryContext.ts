import React from "react"
import { HistoryType } from "../ExtraFunctions/History"

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
}
const HistoryContext: React.Context<HistoryType> = React.createContext(defaultHistory)

export {
    HistoryContext,
}