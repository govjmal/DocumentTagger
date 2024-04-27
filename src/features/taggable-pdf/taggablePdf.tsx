import { useTaggablePdfStore } from "./taggablePdf.store";
import useRegionCreator from "./useTaggablePdf";
import Skeleton from "./skeleton/skeleton";
import PdfDisplay from "../pdf-display/pdfDisplay";
import Region from "./region/region";
import DrawingRegion from "./drawingRegion/drawingRegion";

export default () => {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);
  const { handleMouseDown, handleMouseMove, handleMouseUp, regions, drawingRegion } = useRegionCreator();

  if (!pdfFile) return <Skeleton />;
  return (
    <div id="eb831180b1c3" style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div>
          <PdfDisplay pdfFile={pdfFile} />
        </div>
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
          {regions.map((region, index) => (
            <Region key={index} {...region} />
          ))}
        </div>
        {drawingRegion && <DrawingRegion {...drawingRegion} />}
      </div>
    </div>
  );
};
