const LOCAL_STORAGE_KEY = "presentation-editor-state";

export function saveToLocalStorage(editor: any) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(editor));
}

export function loadFromLocalStorage() {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
}
