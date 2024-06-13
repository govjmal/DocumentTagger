import { Side } from "./side";

export type VisuallyModifiable = {
  dragClickPositionOffset?: { x: number; y: number };
  sideBeingResized?: Side;
};
