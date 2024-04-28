export const container = (height: number): React.CSSProperties => {
  return {
    display: "flex",
    alignItems: "center",
    top: height / 2 - 28,
    right: -110,
    padding: "0px 4px",
    position: "absolute",
    width: "110px",
    height: "56px",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-all",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "12px",
    zIndex: 1,
    borderRadius: "2px"
  };
};

export const addFieldButton: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  left: 10,
  color: "white",
  backgroundColor: "hsl(131, 41%, 48%)",
  padding: "0px 4px",
  position: "relative",
  width: "90px",
  height: "24px",
  overflow: "hidden",
  userSelect: "none",
  wordBreak: "break-all",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "12px",
  zIndex: 2,
  borderRadius: "2px"
};
