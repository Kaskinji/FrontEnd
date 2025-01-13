
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
  
