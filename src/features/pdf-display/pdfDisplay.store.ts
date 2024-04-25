import { create } from "zustand";

type PdfDisplayStore = {
  updatePdfRef: (ref: HTMLDivElement) => void;
  pdfRef?: HTMLDivElement;
};

export const usePdfDisplayStore = create<PdfDisplayStore>((set) => ({
  pdfRef: undefined,
  updatePdfRef: (ref: HTMLDivElement) => set({ pdfRef: ref }),
}));
