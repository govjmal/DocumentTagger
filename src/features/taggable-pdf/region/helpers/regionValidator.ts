import { Field, Region } from "../../types/region";

export const regionAndFieldsHaveFullDetails = (regions: Region[]) => {
  for (const region of regions) {
    if (!regionHasFullDetails(region)) return false;
    if (region.fields.length && region.fields.some((x) => !fieldHasFullDetails(x))) return false;
  }

  return true;
};

export const regionHasFullDetails = (region: Region): boolean => {
  return !!(region.id && region.keywords && region.userFriendlyName);
};

export const fieldHasFullDetails = (field: Field): boolean => {
  return !!(field.id && field.userFriendlyName);
};
