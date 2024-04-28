export type Region = {
  userFriendlyName?: string;
  id?: string;
  keywords?: string;
  location: Location;
};

type Location = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
};
