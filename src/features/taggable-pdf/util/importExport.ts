import { Field, Location, Region } from "../types/region";

type Configuration = {
  regions: ConfigurationRegion[];
};

type ConfigurationRegion = Omit<Region, "isActive" | "dragClickPositionOffset" | "sideBeingResized"> & {
  location: ConfigurationLocation;
  value: ConfigurationField;
};

type ConfigurationField = Omit<Field, "dragClickPositionOffset" | "sideBeingResized"> & {
  location: Omit<ConfigurationLocation, "pageNumber">;
};

type ConfigurationLocation = Location & {
  xPercent: string;
  yPercent: string;
  widthPercent: string;
  heightPercent: string;
};

export const ToConfiguration = (
  regions: Region[],
  pageDimensions: { width: number; height: number }
): Configuration => {
  return {
    regions: regions.map((region) => {
      const value = region.fields[0];

      // Manually map to remove non-conformant runtime properties and add percentages
      return {
        userFriendlyName: region.userFriendlyName,
        value: !!value ? {
          location: {
            ...value.location,
            xPercent: percentage(value.location.x, pageDimensions.width),
            yPercent: percentage(value.location.y, pageDimensions.height),
            widthPercent: percentage(value.location.width, pageDimensions.width),
            heightPercent: percentage(value.location.height, pageDimensions.height)
          }
        } : null,
        location: {
          ...region.location,
          xPercent: percentage(region.location.x, pageDimensions.width),
          yPercent: percentage(region.location.y, pageDimensions.height),
          widthPercent: percentage(region.location.width, pageDimensions.width),
          heightPercent: percentage(region.location.height, pageDimensions.height)
        },
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
  return configuration.regions.map((configRegion) => {
    return {
      ...configRegion,
      fields: configRegion.value ? [{ ...configRegion.value }] : []
    };
  });
};

const percentage = (smallerValue, largerValue) => ((smallerValue * 100) / largerValue).toFixed(2);
