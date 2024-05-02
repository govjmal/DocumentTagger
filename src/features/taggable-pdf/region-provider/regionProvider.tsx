import DrawingRegion from "../drawing-region/drawingRegion";
import Field from "../region/field/field";
import Region from "../region/region";
import { Region as RegionType } from "../types/region";
import useRegionProvider from "./useRegionProvider";

interface Props {
  pageNumber: number;
}

export default function RegionProvider({ pageNumber }: Props) {
  const { handleMouseDown, handleMouseMove, handleMouseUp, handleClick, regions, drawingRegion } =
    useRegionProvider(pageNumber);
  const pageRegions = regions.filter((x) => x.location.pageNumber == pageNumber);

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        style={providerStyle(pageRegions)}>
        {pageRegions.map((region, i) => (
          <div key={i}>
            <Region region={region} />
            {region.fields.map((field, y) => {
              return <Field key={"field_" + y} region={region} field={field} />;
            })}
          </div>
        ))}
      </div>
      {drawingRegion && <DrawingRegion {...drawingRegion} />}
    </>
  );
}

const providerStyle = (regions: RegionType[]): React.CSSProperties => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "auto",
    cursor: regions.some((x) => x.isDragging || x.fields.some((f) => f.isDragging)) ? "move" : "auto"
  };
};
