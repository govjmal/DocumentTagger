import DrawingRegion from "../drawing-region/drawingRegion";
import Field from "../region/field";
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
        {pageRegions.map((region, i) => (
          <>
            <Region key={i} region={region} />
            {region.fields.map((field, y) => {
              return <Field key={"field_" + y} region={region} field={field} />;
            })}
          </>
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
  pointerEvents: "auto"
};
