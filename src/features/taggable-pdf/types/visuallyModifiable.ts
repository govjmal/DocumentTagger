import { Side } from "./side";

export type VisuallyModifiable = {
  dragOriginatingOffset?: { x: number; y: number };
  sideBeingResized?: Side;
};
