import { Region } from "../region/region";

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
        x: region.x,
        y: region.y,
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
    return {
      x: config.x,
      y: config.y,
      width: config.width,
      height: config.height,
      pageNumber: config.page,
    };
  });
};
