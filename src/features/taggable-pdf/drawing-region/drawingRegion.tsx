export type Props = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export default function DrawingRegion(drawingRegion: Props) {
  return (
    <div
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
