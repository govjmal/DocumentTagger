import { Region } from "../types/region";

type Configuration = {
  regions: ConfigurationRegion[];
};

type ConfigurationRegion = Region;

export const ToConfiguration = (regions: Region[]): Configuration => {
  return {
    regions: regions.map((region) => {
      return {
        ...region,
      };
    }),
  };
};

export const FromConfiguration = (configurationJson: string): Region[] => {
  const configuration: Configuration = JSON.parse(configurationJson);
  return configuration.regions;
};
