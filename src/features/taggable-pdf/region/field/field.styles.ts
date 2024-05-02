export const outlineContainerStyles = (
  x: number,
  y: number,
  width: number,
  height: number,
  isFocused: boolean,
  isConfigured: boolean
): React.CSSProperties => {
  return {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    backgroundColor: isConfigured ? "rgba(0, 0, 200, 0.1)" : "rgba(255, 0, 0, 0.1)",
    border: "1px solid blue",
    pointerEvents: "auto",
    cursor: "pointer",
    boxShadow: isFocused ? "0 0 14px #9ecaed" : "none"
  };
};
