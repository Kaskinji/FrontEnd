import { legacy_createStore as createStore } from "redux";
import { EditorReducer } from "../redux/EditorReducer";
import { EditorType } from "../../entities/SelectionType";
import AJV from "ajv";

const schema = {
    type: "object",
    properties: {
      presentation: {
        type: "object",
        properties: {
          title: { type: "string" },
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                elements: {
                  type: "array",
                  items: {
                    anyOf: [
                      {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          type: { const: "text" },
                          pos: {
                            type: "object",
                            properties: {
                              x: { type: "number" },
                              y: { type: "number" },
                            },
                            required: ["x", "y"],
                          },
                          size: {
                            type: "object",
                            properties: {
                              width: { type: "number" },
                              height: { type: "number" },
                            },
                            required: ["width", "height"],
                          },
                          text: { type: "string" },
                          fontSize: { type: "number" },
                          fontFamily: { type: "string" },
                          fontColor: { type: "string" },
                        },
                        required: ["id", "type", "pos", "size", "text", "fontSize", "fontFamily", "fontColor"],
                      },
                      {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          type: { const: "image" },
                          pos: {
                            type: "object",
                            properties: {
                              x: { type: "number" },
                              y: { type: "number" },
                            },
                            required: ["x", "y"],
                          },
                          size: {
                            type: "object",
                            properties: {
                              width: { type: "number" },
                              height: { type: "number" },
                            },
                            required: ["width", "height"],
                          },
                          url: { type: "string" },
                        },
                        required: ["id", "type", "pos", "size", "url"],
                      },
                    ],
                  },
                },
                background: { type: "string" },
              },
              required: ["id", "elements", "background"],
            },
          },
        },
        required: ["title", "slides"],
      },
    },
    required: ["presentation"],
  };
  
  const ajv = new AJV()
  const validate = ajv.compile(schema)
  
  const validateEditorData = (data: any): boolean => {
      const isValid = validate(data);
      if (!isValid) {
          console.warn("Ошибки валидации:", validate.errors);
      }
      return isValid;
  };
  
  const saveStateToLocalStorage = (state: EditorType) => {
      try {
          const serializedState = JSON.stringify(state);
          localStorage.setItem("editorState", serializedState);
      } catch (err) {
          console.error("Ошибка сохранения состояния в localStorage", err);
      }
  };
  
  const loadStateFromLocalStorage = (): EditorType | undefined => {
      try {
          const serializedState = localStorage.getItem("editorState");
          if (!serializedState) return undefined;
  
          const parsedState = JSON.parse(serializedState);
  
          if (!validateEditorData(parsedState)) {
              console.warn("Некорректные данные в localStorage. Загружается состояние по умолчанию.");
              return undefined; // Если данные некорректны, вернуть `undefined`
          }
  
          return parsedState as EditorType;
      } catch (err) {
          console.error("Ошибка загрузки состояния из localStorage", err);
          return undefined;
      }
  };
  
  const preloadedState = loadStateFromLocalStorage();
  
  const saveStateEnhancer = (createStore: any) => (...args: any) => {
      const store = createStore(...args);
  
      store.subscribe(() => {
          saveStateToLocalStorage(store.getState());
      });
  
      return store;
  };
  
  const store = createStore(EditorReducer, preloadedState, saveStateEnhancer)
  
  export {
      store
  }