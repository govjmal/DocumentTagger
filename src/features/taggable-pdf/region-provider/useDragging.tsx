import React from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";
import {
  getPage,
  getPageBaseX,
  getPageBaseY,
  getScrollXOffset,
  getScrollYOffset
} from "../region/helpers/regionHelper";

export default function useDragging(pageNumber: number) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);

  const draggingRegion = regions.find((x) => x.isDragging);
  const draggingField = regions.map((x) => x.fields.find((f) => f.isDragging)).filter((x) => !!x)[0];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (draggingRegion || draggingField) {
      const page = getPage(pageNumber);
      const baseXOffset = getPageBaseX(page);
      const baseYOffset = getPageBaseY(page);

      if (draggingRegion) {
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

  const handleMouseUp = () => {
    if (draggingRegion) updateRegion(draggingRegion, { isDragging: false });
    if (draggingField) {
      const region = regions.find((x) => x.fields.some((f) => f === draggingField));
      updateRegion(region, {
        fields: [...region.fields.filter((x) => x !== draggingField), { ...draggingField, isDragging: false }]
      });
    }
  };

  return {
    handleMouseMove,
    handleMouseUp,
    draggingRegion,
    draggingField
  };
}
