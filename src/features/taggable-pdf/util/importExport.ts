import { Region } from "../region/region";
import { createRegion } from "../region/regionHelper";

type Configuration = {
  regions: ConfigurationRegion[];
};

type ConfigurationRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
};

export const ToConfiguration = (regions: Region[]): Configuration => {
  return {
    regions: regions.map((region) => {
      return {
        x: region.pdfX,
        y: region.pdfY,
        width: region.width,
        height: region.height,
        page: region.pageNumber,
      };
    }),
  };
};

export const FromConfiguration = (configurationJson: string): Region[] => {
  const configuration: Configuration = JSON.parse(configurationJson);

  return configuration.regions.map((config) => {
    return createRegion({
      pdfX: config.x,
      pdfY: config.y,
      width: config.width,
      height: config.height,
      pageNumber: config.page,
    });
  });
};
