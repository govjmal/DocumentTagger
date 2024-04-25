import { create } from "zustand";

type TaggabblePdfStore = {
  updatePdfFile: (pdfFile: File) => void;
  pdfFile?: File;
};

export const useTaggablePdfStore = create<TaggabblePdfStore>((set) => ({
  pdfFile: undefined,
  updatePdfFile: (pdfFile: File) => set({ pdfFile }),
}));
