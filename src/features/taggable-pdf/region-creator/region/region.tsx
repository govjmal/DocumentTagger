export interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  pdfX: number;
  pdfY: number;
  pageNumber: number;
}

export default ({ x, y, width, height, pdfX, pdfY, pageNumber }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        border: "1px solid red",
        pointerEvents: "none", // Prevent region from capturing mouse events
      }}>
      <div
        style={{
          top: -8,
          left: -1,
          color: "white",
          backgroundColor: "red",
          padding: "2px",
          fontSize: "8px",
          position: "absolute",
          maxWidth: width,
          maxHeight: "16px",
          overflow: "hidden",
        }}>
        {`X: ${pdfX.toFixed(2)}, Y: ${pdfY.toFixed(2)}, W: ${width}, H: ${height}, P: ${pageNumber}`}
      </div>
    </div>
  );
};
