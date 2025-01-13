import AJV from "ajv";

export const schema = {
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

export const handleExport = (editorState: string | null, downloadRef: React.RefObject<HTMLAnchorElement>) => {
    if (!editorState) {
        alert("Нет данных для экспорта.")
        return
    }
    console.log("ok")
    const blob = new Blob([editorState], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    if (downloadRef.current) {
        downloadRef.current.href = url
        downloadRef.current.download = "presentation.json"
        downloadRef.current.click()
        URL.revokeObjectURL(url)
    }
}

export const handleImport = ( file: File, setEditor: (data: any) => void ) => {
    const reader = new FileReader()
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result as string)
            const valid = validate(data)
            if (!valid) {
                alert("Неверный формат документа. Ошибки валидации:")
                console.log(validate.errors)
                return
            }
            setEditor(data)
        } catch (error) {
            alert("Ошибка импорта: " + (error as Error).message)
        }
    }
    reader.readAsText(file)
}