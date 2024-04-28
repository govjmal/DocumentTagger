interface Props {
  userFriendlyName?: string;
  location: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  colour: string;
}

export default function TopPanel({ userFriendlyName, location, colour }: Props) {
  const { x, y, width, height } = location;

  return (
    <div
      style={{
        top: -34,
        left: -1,
        color: "white",
        backgroundColor: colour,
        padding: "0px 4px",
        position: "absolute",
        width: width,
        height: "34px",
        overflow: "hidden",
        userSelect: "none",
        wordBreak: "break-all",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px",
        zIndex: 1
      }}>
      <div style={{ fontSize: "12px" }}>{userFriendlyName}</div>
      <div style={{ fontSize: "8px" }}>{`X: ${x}, Y: ${y}, W: ${width}, H: ${height}`}</div>
    </div>
  );
}
