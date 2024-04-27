export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
}

export default ({ x, y, width, height, pageNumber }: Region) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        border: "1px solid red",
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
          width: width,
          maxHeight: "16px",
          overflow: "hidden",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        {`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, W: ${width}, H: ${height}, P: ${pageNumber}`}
      </div>
    </div>
  );
};
