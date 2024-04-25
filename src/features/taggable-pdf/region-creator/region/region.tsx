import { useMemo } from "react";
import { usePdfDisplayStore } from "../../../pdf-display/pdfDisplay.store";
import { PageClass } from "../../../pdf-display/constants/reactPdf";

export interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  pageNumber: number;
}

export default ({ x, y, width, height, pageNumber }: Props) => {
  const pdfContainerRef = usePdfDisplayStore((x) => x.pdfRef);
  const pdfPage = pdfContainerRef.querySelectorAll(PageClass)[pageNumber - 1];

  const convertToPdfCoordinates = useMemo(
    () => (x: number, y: number, pdfPage: Element) => {
      if (pdfPage) {
        const pageRect = pdfPage.getBoundingClientRect();
        const pdfX = x - pageRect.left - window.scrollX;
        const pdfY = y - pageRect.top - window.scrollY; // Calculate Y coordinate relative to the pageRect's top
        return { x: pdfX, y: pdfY };
      }
    },
    []
  );

  const coordinates = convertToPdfCoordinates(x, y, pdfPage);
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
        style={{ position: "absolute", top: -20, left: 0, color: "white", backgroundColor: "red", padding: "4px 8px" }}>
        {`PDF X: ${coordinates.x.toFixed(2)}, PDF Y: ${coordinates.y.toFixed(2)}`}
      </div>
    </div>
  );
};
