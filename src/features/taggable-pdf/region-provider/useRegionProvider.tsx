import React, { useState } from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";
import { Props as DrawingRegionProps } from "../drawing-region/drawingRegion";
import {
  pdfCoordinatesForEvent,
  getScrollXOffset,
  getScrollYOffset,
  getPage,
  getPageBaseX,
  getPageBaseY
} from "../region/helpers/regionHelper";

export default function useRegionProvider(pageNumber: number) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);
  const [drawingRegion, setDrawingRegion] = useState<DrawingRegionProps | null>(null);
  const draggingRegion = regions.find((x) => x.isDragging);
  const draggingField = regions.map((x) => x.fields.find((f) => f.isDragging)).filter((x) => !!x)[0];

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const page = getPage(pageNumber);
    const baseXOffset = getPageBaseX(page);
    const baseYOffset = getPageBaseY(page);

    setDrawingRegion({
      x: event.clientX - baseXOffset + getScrollXOffset(),
      y: event.clientY - baseYOffset + getScrollYOffset(),
      width: drawingRegion?.width,
      height: drawingRegion?.height
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion || draggingRegion || draggingField) {
      const page = getPage(pageNumber);
      const baseXOffset = getPageBaseX(page);
      const baseYOffset = getPageBaseY(page);

      if (drawingRegion) {
        setDrawingRegion({
          ...drawingRegion,
          width: event.clientX - drawingRegion.x - baseXOffset + getScrollXOffset(),
          height: event.clientY - drawingRegion.y - baseYOffset + getScrollYOffset()
        });
      } else if (draggingRegion) {
        updateRegion(draggingRegion, {
          location: {
            ...draggingRegion.location,
            x: event.clientX - baseXOffset + getScrollXOffset() + 5,
            y: event.clientY - baseYOffset + getScrollYOffset() + 5
          }
        });
      } else if (draggingField) {
        const region = regions.find((x) => x.fields.some((f) => f == draggingField));

        updateRegion(region, {
          fields: [
            ...region.fields.filter((x) => x !== draggingField),
            {
              ...draggingField,
              location: {
                ...draggingField.location,
                x: event.clientX - baseXOffset + getScrollXOffset() + 5,
                y: event.clientY - baseYOffset + getScrollYOffset() + 5
              }
            }
          ]
        });
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drawingRegion && drawingRegion.height > 10 && drawingRegion.width > 15) {
      const pageCoordinates = pdfCoordinatesForEvent(event, pageNumber);

      if (pageCoordinates)
        updateRegions([
          ...regions,
          {
            userFriendlyName: `Region ${regions.length + 1}`,
            id: `page_${pageNumber}_region_${regions.length + 1}`,
            fields: [],
            location: {
              x: drawingRegion.x,
              y: drawingRegion.y,
              width: drawingRegion.width,
              height: drawingRegion.height,
              pageNumber
            }
          }
        ]);
    }

    if (drawingRegion) setDrawingRegion(null);
    if (draggingRegion) updateRegion(draggingRegion, { isDragging: false });
    if (draggingField) {
      const region = regions.find((x) => x.fields.some((f) => f === draggingField));
      updateRegion(region, {
        fields: [...region.fields.filter((x) => x !== draggingField), { ...draggingField, isDragging: false }]
      });
    }
  };

  const handleClick = () => {
    const activeRegions = regions.filter((x) => x.isActive);
    if (!activeRegions.length) return;

    activeRegions.forEach((region) => {
      updateRegion(region, { isActive: false });
    });
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    regions,
    drawingRegion
  };
}
