export const outlineContainerStyles = (x: number, y: number, width: number, height: number): React.CSSProperties => {
  return {
    position: "absolute",
    left: x,
    top: y,
    width: width,
    height: height,
    border: "1px solid red",
    pointerEvents: "auto",
    cursor: "pointer",
  };
};

export const focusPanelStyles = (width: number): React.CSSProperties => {
  return {
    top: -34,
    left: -1,
    color: "white",
    backgroundColor: "hsl(204, 71%, 39%)",
    padding: "0px 4px",
    position: "absolute",
    width: width,
    height: "34px",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-all",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    zIndex: 1,
  };
};

export const focusPanelRegionName: React.CSSProperties = {
  fontSize: "12px",
};

export const focusPanelRegionLocation: React.CSSProperties = {
  fontSize: "8px",
};
