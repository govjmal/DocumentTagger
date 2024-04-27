import DrawingRegion from "../drawing-region/drawingRegion";
import Region from "../region/region";
import useRegionProvider from "./useRegionProvider";

interface Props {
  pageNumber: number;
}

export default function RegionProvider({ pageNumber }: Props) {
  const { handleMouseDown, handleMouseMove, handleMouseUp, regions, drawingRegion } = useRegionProvider(pageNumber);
  const pageRegions = regions.filter((x) => x.location.pageNumber == pageNumber);

  return (
    <>
      <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} style={providerStyle}>
        {pageRegions.map((region, index) => (
          <Region key={index} region={region} />
        ))}
      </div>
      {drawingRegion && <DrawingRegion {...drawingRegion} />}
    </>
  );
}

const providerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "auto",
};
