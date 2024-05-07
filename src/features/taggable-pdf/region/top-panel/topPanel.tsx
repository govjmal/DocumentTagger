import { useRef } from "react";

interface Props {
  userFriendlyName?: string;
  location: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  colour: string;
  actionsComponent: React.ReactNode;
}

export default function TopPanel({ userFriendlyName, location, colour, actionsComponent }: Props) {
  const { x, y, width, height } = location;
  const panelHeight = 34;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        top: -panelHeight,
        height: panelHeight,
        left: -1,
        color: "white",
        backgroundColor: colour,
        padding: "0px 4px",
        position: "absolute",
        width: width,
        overflow: "hidden",
        userSelect: "none",
        wordBreak: "break-all",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px",
        zIndex: 1
      }}>
      <div>
        <div style={{ fontSize: "12px" }}>{userFriendlyName}</div>
        <div style={{ fontSize: "8px" }}>{`X: ${x}, Y: ${y}, W: ${width}, H: ${height}`}</div>
      </div>
      {!!actionsComponent && (
        <div style={{ paddingTop: "2px", position: "absolute", right: "2px" }}>{actionsComponent}</div>
      )}
    </div>
  );
}
