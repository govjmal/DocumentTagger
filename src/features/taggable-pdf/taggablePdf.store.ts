import { create } from "zustand";
import { Region } from "./types/region";
import { OptionalProperties } from "./types/optional";

type TaggabblePdfStore = {
  regions: Region[];
  updateRegion: (region: Region, newValues: OptionalProperties<Region>) => void;
  updateRegions: (regions: Region[]) => void;
  removeRegion: (region: Region) => void;
  pdfFile?: File;
  updatePdfFile: (pdfFile: File) => void;
};

export const useTaggablePdfStore = create<TaggabblePdfStore>((set) => ({
  pdfFile: undefined,
  updatePdfFile: (pdfFile: File) => set({ pdfFile }),
  regions: [],
  updateRegions: (regions: Region[]) => set({ regions }),

  removeRegion: (region: Region) => {
    set((state) => {
      const regionToUpdateIndex = state.regions.findIndex((x) => x == region);
      state.regions.splice(regionToUpdateIndex, 1);

      return {
        regions: [...state.regions]
      };
    });
  },

  updateRegion: (region: Region, newValues: OptionalProperties<Region>) => {
    set((state) => {
      if (JSON.stringify(region) === JSON.stringify(newValues)) return state;

      const newRegion = { ...region, ...newValues };
      const index = state.regions.findIndex((x) => x === region);
      const regions = state.regions;

      if (!region.isActive && newValues.isActive) regions.forEach((x) => (x.isActive = false));

      regions.splice(index, 1, newRegion);

      return {
        regions: [...regions]
      };
    });
  }
}));
