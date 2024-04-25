import React, { useState } from "react";
import PdfDisplay from "../../pdf-display/pdfDisplay";
import Region, { Props as RegionProps } from "./region/region";

interface Props {
  pdfFile: File;
}

export default ({ pdfFile }: Props) => {
  const [regions, setRegions] = useState<RegionProps[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentRegion, setCurrentRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );

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
            <Region key={index} {...region} />
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
