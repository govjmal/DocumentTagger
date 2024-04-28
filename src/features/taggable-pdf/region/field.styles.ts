export const outlineContainerStyles = (
  x: number,
  y: number,
  width: number,
  height: number,
  isFocused: boolean
): React.CSSProperties => {
  return {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    border: "1px solid blue",
    pointerEvents: "auto",
    cursor: "pointer",
    boxShadow: isFocused ? "0 0 14px #9ecaed" : "none"
  };
};
