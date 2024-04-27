import DrawingRegion from "../drawingRegion/drawingRegion";
import Region from "../region/region";
import useRegionProvider from "./useRegionProvider";

interface Props {
  pageNumber: number;
}

export default function RegionProvider({ pageNumber }: Props) {
  const { handleMouseDown, handleMouseMove, handleMouseUp, regions, drawingRegion } = useRegionProvider(pageNumber);
  const pageRegions = regions.filter((x) => x.pageNumber == pageNumber);

  if (pageRegions.length) console.log(pageRegions, pageRegions[0], pageRegions[1]);
  return (
    <div>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}>
        {pageRegions.map((region, index) => (
          <Region key={index} {...region} />
        ))}
      </div>
      {drawingRegion && <DrawingRegion {...drawingRegion} />}
    </div>
  );
}
