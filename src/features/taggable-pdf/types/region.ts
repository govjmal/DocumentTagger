import { VisuallyModifiable } from "./visuallyModifiable";

export type Region = VisuallyModifiable & {
  userFriendlyName?: string;
  id?: string;
  keywords?: string;
  location: Location;
  fields?: Field[];
  isActive?: boolean;
};

export type Location = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
};

export type Field = VisuallyModifiable & {
  userFriendlyName?: string;
  id?: string;
  location: Omit<Location, "pageNumber">;
};
