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
    border: isConfigured ? "1px solid darkgreen" : "1px solid red",
    pointerEvents: "auto",
    cursor: "pointer",
    boxShadow: isFocused ? "0 0 14px #9ecaed" : "none",
    backgroundColor: isConfigured ? "rgba(100, 100, 0, 0.1)" : "rgba(255, 0, 0, 0.1)"
  };
};

export const rightPanelContainer = (width: number) => {
  return {
    marginLeft: width
  };
};
