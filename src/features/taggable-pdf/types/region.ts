export type Region = {
  userFriendlyName?: string;
  id?: string;
  keywords?: string;
  location: Location;
  fields?: Field[];
  isActive?: boolean;
  isDragging?: boolean;
};

type Location = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
};

export type Field = {
  userFriendlyName?: string;
  id?: string;
  location: Omit<Location, "pageNumber">;
  isDragging?: boolean;
};
