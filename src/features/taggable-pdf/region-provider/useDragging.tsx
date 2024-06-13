import React, { useEffect, useState } from "react";
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

  const draggingRegion = regions.find((x) => !!x.dragClickPositionOffset);
  const draggingField = regions.map((x) => x.fields.find((f) => !!f.dragClickPositionOffset)).filter((x) => !!x)[0];

  const [clickPositionXOffset, setClickPositionXOffset] = useState(null);
  const [clickPositionYOffset, setClickPositionYOffset] = useState(null);

  useEffect(() => {
    const draggedEntity = draggingRegion ?? draggingField;
    if (draggedEntity) {
      const { x, y } = calculateRelativeXAndY(
        draggedEntity.dragClickPositionOffset.x,
        draggedEntity.dragClickPositionOffset.y
      );
      setClickPositionXOffset(x - draggedEntity.location.x);
      setClickPositionYOffset(y - draggedEntity.location.y);
    } else {
      setClickPositionXOffset(null);
      setClickPositionYOffset(null);
    }
  }, [draggingField?.dragClickPositionOffset, draggingRegion?.dragClickPositionOffset]);

  const calculateRelativeXAndY = (eventX: number, eventY: number): { x: number; y: number } => {
    const page = getPage(pageNumber);
    const baseXOffset = getPageBaseX(page);
    const baseYOffset = getPageBaseY(page);

    const relativeX = eventX - baseXOffset + getScrollXOffset();
    const relativeY = eventY - baseYOffset + getScrollYOffset();
    return {
      x: relativeX,
      y: relativeY
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const hasCalculatedOffsets = clickPositionXOffset && clickPositionYOffset;
    if ((draggingRegion || draggingField) && hasCalculatedOffsets) {
      const { x, y } = calculateRelativeXAndY(event.clientX, event.clientY);

      if (draggingRegion) {
        updateRegion(draggingRegion, {
          location: {
            ...draggingRegion.location,
            x: x - clickPositionXOffset,
            y: y - clickPositionYOffset
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
                x: x - clickPositionXOffset,
                y: y - clickPositionYOffset
              }
            }
          ]
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (draggingRegion) updateRegion(draggingRegion, { dragClickPositionOffset: null });
    if (draggingField) {
      const region = regions.find((x) => x.fields.some((f) => f === draggingField));
      updateRegion(region, {
        fields: [
          ...region.fields.filter((x) => x !== draggingField),
          { ...draggingField, dragClickPositionOffset: null }
        ]
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
