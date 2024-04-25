import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import PdfDisplay from "../../pdf-display/pdfDisplay";
import Region from "./region/region";
import { usePdfDisplayStore } from "../../pdf-display/pdfDisplay.store";
import { PageClass } from "../../pdf-display/constants/reactPdf";

interface Props {
  pdfFile: File;
}

export default ({ pdfFile }: Props) => {
  // const pdfContainerRef = usePdfDisplayStore((x) => x.pdfRef);
  const [regions, setRegions] = useState<{ x: number; y: number; width: number; height: number; pageNumber: number }[]>(
    []
  );
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentRegion, setCurrentRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );
  // const [pdfScale, setPdfScale] = useState<number>(1);
  // const [pdfPages, setPdfPages] = useState<number>(1);

  // useEffect(() => {
  //   function updateDimensions() {
  //     if (pdfContainerRef.current) {
  //       const rect = pdfContainerRef.current.getBoundingClientRect();
  //       setPdfScale(rect.width / pdfContainerRef.current.offsetWidth);
  //     }
  //   }
  //   window.addEventListener("resize", updateDimensions);
  //   updateDimensions();
  //   return () => window.removeEventListener("resize", updateDimensions);
  // }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartPosition({ x: event.clientX, y: event.clientY });
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && startPosition) {
      const currentX = startPosition.x;
      const currentY = startPosition.y;
      const width = event.clientX - currentX;
      const height = event.clientY - currentY;
      setCurrentRegion({ x: currentX, y: currentY, width, height });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && startPosition && currentRegion) {
      setRegions((prevRegions) => [...prevRegions, { ...currentRegion, pageNumber: 1 }]);
    }
    setIsDrawing(false);
    setStartPosition(null);
    setCurrentRegion(null);
  };

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div>
          <PdfDisplay pdfFile={pdfFile} />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }}>
          {regions.map((region, index) => (
            <Region
              key={index}
              x={region.x}
              y={region.y}
              width={region.width}
              height={region.height}
              pageNumber={region.pageNumber}
            />
          ))}
          {isDrawing && currentRegion && (
            <div
              style={{
                position: "absolute",
                left: currentRegion.x,
                top: currentRegion.y,
                width: currentRegion.width,
                height: currentRegion.height,
                border: "1px dashed red",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
