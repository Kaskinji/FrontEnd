import { Presentation, changePresentationName, CreatePresentation, CreateSlide, Slide, BackgroundSlide, changeSlideBackground,  } from "./Presentation.ts";

describe("CreatePresentation", () => {
    it("Create pres", () => {
        expect(CreatePresentation()).toEqual({ title: "New Presentation", slides: [] });
    });
});

describe("ChangeName", () => {
    const pres = CreatePresentation();
    it("Rename pres", () => {
        expect(changePresentationName(pres, "Super New Presentation")).toEqual({
            title: "Super New Presentation",
            slides: [],
        });
    });

    it("not renames to empty name", () => {
        expect(changePresentationName(pres, " ",)).toEqual(pres);
        expect(changePresentationName(pres, "")).toEqual(pres);
    });

});



