export type Props = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export default function DrawingRegion(drawingRegion: Props) {
  return (
    <div
      // onMouseUp={(e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      // }}
      style={{
        position: "absolute",
        left: drawingRegion.x,
        top: drawingRegion.y,
        width: drawingRegion.width,
        height: drawingRegion.height,
        border: "1px dashed red",
        pointerEvents: "none",
      }}
    />
  );
}
