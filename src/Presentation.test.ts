import {
  Presentation, CreatePresentation, changePresentationName
} from "../Presentation";

describe("CreatePresentation", () => {
    it("Create pres", () => {
        expect(CreatePresentation()).toEqual({ name: "New Presentation", listSlides: [] });
    });
});

describe("ChangeName", () => {
    const pres: Presentation = CreatePresentation();
    it("Rename pres", () => {
        expect(changePresentationName("Ne presentation", pres)).toEqual({
            name: "Ne presentation",
            listSlides: [],
        });
    });

    it("not renames to empty name", () => {
        expect(changePresentationName(" ", pres)).toEqual(pres);
        expect(changePresentationName("", pres)).toEqual(pres);
    });
});