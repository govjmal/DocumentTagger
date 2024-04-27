import { create } from "zustand";
import { Region } from "./region-creator/region/region";

type TaggabblePdfStore = {
  regions: Region[];
  updateRegions: (regions: Region[]) => void;
  pdfFile?: File;
  updatePdfFile: (pdfFile: File) => void;
};

export const useTaggablePdfStore = create<TaggabblePdfStore>((set) => ({
  pdfFile: undefined,
  updatePdfFile: (pdfFile: File) => set({ pdfFile }),
  regions: [],
  updateRegions: (regions: Region[]) => set({ regions }),
}));
