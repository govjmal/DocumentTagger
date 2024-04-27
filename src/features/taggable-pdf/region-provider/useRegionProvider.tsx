import React, { useState } from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";
import { Props as DrawingRegionProps } from "../drawingRegion/drawingRegion";
import {
  pdfCoordinatesForEvent,
  getScrollXOffset,
  getScrollYOffset,
  getPage,
  getPageBaseX,
  getPageBaseY,
} from "../region/regionHelper";

export default function useRegionProvider(pageNumber: number) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);
  const [drawingRegion, setDrawingRegion] = useState<DrawingRegionProps | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const page = getPage(pageNumber);
    const baseXOffset = getPageBaseX(page);
    const baseYOffset = getPageBaseY(page);

    setDrawingRegion({
      x: event.clientX - baseXOffset + getScrollXOffset(),
      y: event.clientY - baseYOffset + getScrollYOffset(),
      width: drawingRegion?.width,
      height: drawingRegion?.height,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion) {
      const page = getPage(pageNumber);
      const baseXOffset = getPageBaseX(page);
      const baseYOffset = getPageBaseY(page);

      setDrawingRegion({
        ...drawingRegion,
        width: event.clientX - drawingRegion.x - baseXOffset + getScrollXOffset(),
        height: event.clientY - drawingRegion.y - baseYOffset + getScrollYOffset(),
      });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion && drawingRegion.height && drawingRegion.width) {
      const pageCoordinates = pdfCoordinatesForEvent(event, pageNumber);

      if (pageCoordinates)
        updateRegions([
          ...regions,
          {
            x: drawingRegion.x,
            y: drawingRegion.y,
            width: drawingRegion.width,
            height: drawingRegion.height,
            pageNumber,
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
