import React, { useState } from "react";
import { useTaggablePdfStore } from "./taggablePdf.store";
import { Props as DrawingRegionProps } from "./drawingRegion/drawingRegion";
import { coordinatesForEvent, getBaseX, getBaseY, getScrollXOffset, getScrollYOffset } from "./region/regionHelper";

export default function useRegionCreator() {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);
  const [drawingRegion, setDrawingRegion] = useState<DrawingRegionProps | null>(null);

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
        updateRegions([
          ...regions,
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
    regions,
    drawingRegion,
  };
}
