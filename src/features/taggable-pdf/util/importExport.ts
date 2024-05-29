import { Region } from "../types/region";

type Configuration = {
  regions: ConfigurationRegion[];
};

type ConfigurationRegion = Omit<Region, "isActive" | "dragOriginatingOffset" | "sideBeingResized">;

export const ToConfiguration = (regions: Region[]): Configuration => {
  return {
    regions: regions.map((region) => {
      // Manually map to remove non-conformant runtime properties
      return {
        userFriendlyName: region.userFriendlyName,
        fields: region.fields,
        location: region.location,
        id: region.id,
        keywords: region.keywords,
        matchInSentence: region.matchInSentence,
        occurenceOnPage: region.occurenceOnPage
      };
    })
  };
};

export const FromConfiguration = (configurationJson: string): Region[] => {
  const configuration: Configuration = JSON.parse(configurationJson);
  return configuration.regions;
};
