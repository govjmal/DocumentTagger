import React from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";

import useDragging from "./useDragging";
import useDrawing from "./useDrawing";
import useResizing from "./useResizing";

export default function useRegionProvider(pageNumber: number) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);
  const dragging = useDragging(pageNumber);
  const drawing = useDrawing(pageNumber);
  const resizing = useResizing(pageNumber);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    dragging.handleMouseMove(event);
    drawing.handleMouseMove(event);
    resizing.handleMouseMove(event);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    dragging.handleMouseUp();
    drawing.handleMouseUp(event);
    resizing.handleMouseUp();
  };

  const handleClick = () => {
    const activeRegions = regions.filter((x) => x.isActive);
    if (!activeRegions.length) return;

    activeRegions.forEach((region) => {
      updateRegion(region, { isActive: false });
    });
  };

  return {
    handleMouseDown: drawing.handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    regions,
    drawingRegion: drawing.drawingRegion
  };
}
