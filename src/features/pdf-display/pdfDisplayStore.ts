import { create } from "zustand";
import { PageDimensions } from "./types/pageDimensions";

type TaggabblePdfStore = {
  pageDimensions: PageDimensions;
  updatePageDimensions: (dimensions: PageDimensions) => void;
};

export const usePdfDisplayStore = create<TaggabblePdfStore>((set) => ({
  pageDimensions: undefined,
  updatePageDimensions: (pageDimensions: PageDimensions) => set({ pageDimensions })
}));
