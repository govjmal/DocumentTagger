import React from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";
import {
  getPage,
  getPageBaseX,
  getPageBaseY,
  getScrollXOffset,
  getScrollYOffset,
  heightOrMinHeight,
  widthOrMinWidth,
  xOrMinWidth,
  yOrMinHeight
} from "../region/helpers/regionHelper";
import { Location } from "../types/region";

export default function useResizing(pageNumber: number) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);

  const resizingRegion = regions.find((x) => !!x.sideBeingResized);
  const resizingField = regions.map((x) => x.fields.find((f) => !!f.sideBeingResized)).filter((x) => !!x)[0];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (resizingRegion || resizingField) {
      const page = getPage(pageNumber);
      const baseXOffset = getPageBaseX(page);
      const baseYOffset = getPageBaseY(page);

      const y = event.clientY - baseYOffset + getScrollYOffset();
      const x = event.clientX - baseXOffset + getScrollXOffset();

      const sideBeingResized = resizingRegion?.sideBeingResized ?? resizingField?.sideBeingResized;
      let location = resizingRegion?.location ?? resizingField?.location;
      switch (sideBeingResized) {
        case "top":
          location = {
            ...location,
            height: heightOrMinHeight(location.height + (location.y - y)),
            y: yOrMinHeight(y, location)
          };
          break;
        case "right":
          location = {
            ...location,
            width: widthOrMinWidth(location.width + (x - (location.x + location.width)))
          };
          break;
        case "bottom":
          location = {
            ...location,
            height: heightOrMinHeight(y - location.y)
          };
          break;
        case "left":
          location = {
            ...location,
            width: widthOrMinWidth(location.width + (location.x - x)),
            x: xOrMinWidth(x, location)
          };
          break;
      }

      if (resizingRegion) updateRegion(resizingRegion, { location: location as Location });
      if (resizingField) {
        const region = regions.find((x) => x.fields.some((f) => f == resizingField));
        updateRegion(region, {
          fields: [
            ...region.fields.filter((x) => x !== resizingField),
            {
              ...resizingField,
              location
            }
          ]
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (resizingRegion) updateRegion(resizingRegion, { sideBeingResized: null });
    if (resizingField) {
      const region = regions.find((x) => x.fields.some((f) => f === resizingField));
      updateRegion(region, {
        fields: [...region.fields.filter((x) => x !== resizingField), { ...resizingField, sideBeingResized: null }]
      });
    }
  };

  return {
    handleMouseMove,
    handleMouseUp,
    draggingRegion: resizingRegion,
    draggingField: resizingField
  };
}
