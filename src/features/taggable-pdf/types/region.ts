export type Region = {
  userFriendlyName?: string;
  name?: string;
  location: Location;
};

type Location = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
};
