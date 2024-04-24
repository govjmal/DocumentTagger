import { create } from "zustand";

type TabblePdfStore = {
  updatePdfFile: (pdfFile: File) => void;
  pdfFile?: File;
};

export const useTaggablePdfStore = create<TabblePdfStore>((set) => ({
  pdfFile: undefined,
  updatePdfFile: (pdfFile: File) => set({ pdfFile }),
}));
