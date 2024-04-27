import React, { useRef, useState } from "react";
import { Props as DrawingRegionProps } from "./drawingRegion/drawingRegion";
import { Props as RegionProps } from "./region/region";
import { coordinatesForEvent } from "./region/regionHelper";

export default function useRegionCreator() {
  const scrollContainer = useRef<HTMLDivElement>();
  const [regions, setRegions] = useState<RegionProps[]>([]);
  const [drawingRegion, setDrawingRegion] = useState<DrawingRegionProps | null>(null);

  const getBaseX = () => scrollContainer.current.getBoundingClientRect().left;
  const getBaseY = () => scrollContainer.current.getBoundingClientRect().top;
  const getScrollXOffset = () => scrollContainer.current.scrollLeft;
  const getScrollYOffset = () => scrollContainer.current.scrollTop;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDrawingRegion({
      x: event.clientX - getBaseX() + getScrollXOffset(),
      y: event.clientY - getBaseY() + getScrollYOffset(),
      width: drawingRegion?.width,
      height: drawingRegion?.height,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion) {
      setDrawingRegion({
        ...drawingRegion,
        width: event.clientX - drawingRegion.x - getBaseX() + getScrollXOffset(),
        height: event.clientY - drawingRegion.y - getBaseY() + getScrollYOffset(),
      });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion && drawingRegion.height && drawingRegion.width) {
      const pageCoordinates = coordinatesForEvent(event);

      if (pageCoordinates)
        setRegions((prevRegions) => [
          ...prevRegions,
          {
            x: drawingRegion.x,
            y: drawingRegion.y,
            pdfX: pageCoordinates.pdfX - drawingRegion.width,
            pdfY: pageCoordinates.pdfY - drawingRegion.height,
            width: drawingRegion.width,
            height: drawingRegion.height,
            pageNumber: pageCoordinates.pageNumber,
          },
        ]);

      setDrawingRegion(null);
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    scrollContainer,
    regions,
    drawingRegion,
  };
}
