import { Side } from "@/features/taggable-pdf/types/side";

interface Props {
  side: Side;
  onClick: (side: Side) => void;
}

export default function ResizeSide({ onClick, side }: Props) {
  const onMouseDown = (e) => {
    e.preventDefault();
    onClick(side);
  };

  const isLeftOrRight = side === "left" || side === "right";
  return (
    <div
      style={{
        height: isLeftOrRight ? "100%" : "3px",
        width: isLeftOrRight ? "3px" : "100%",
        position: "absolute",
        [side]: "-3px",
        background: "red",
        cursor: isLeftOrRight ? "col-resize" : "row-resize"
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={onMouseDown}
    />
  );
}
