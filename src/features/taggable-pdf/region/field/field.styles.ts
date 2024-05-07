import { Field, Region } from "../../types/region";
import { fieldHasFullDetails } from "../helpers/regionValidator";

export const outlineContainerStyles = (
  x: number,
  y: number,
  width: number,
  height: number,
  region: Region,
  field: Field
): React.CSSProperties => {
  const isActive = region.isActive;
  const isConfigured = fieldHasFullDetails(field);

  return {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    backgroundColor: isConfigured ? "rgba(0, 0, 200, 0.1)" : "rgba(255, 0, 0, 0.1)",
    border: "1px solid blue",
    pointerEvents: "auto",
    cursor: field.dragOriginatingOffset ? "move" : "pointer",
    boxShadow: isActive ? "0 0 14px #9ecaed" : "none"
  };
};
