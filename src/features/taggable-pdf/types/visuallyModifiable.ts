import { Side } from "./side";

export type VisuallyModifiable = {
  isDragging?: boolean;
  sideBeingResized?: Side;
};
