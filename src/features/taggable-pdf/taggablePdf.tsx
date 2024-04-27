import { useTaggablePdfStore } from "./taggablePdf.store";
import Skeleton from "./skeleton/skeleton";
import PdfDisplay from "../pdf-display/pdfDisplay";
import RegionProvider from "./region-provider/regionProvider";
export default () => {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);

  if (!pdfFile) return <Skeleton />;
  return (
    <div id="eb831180b1c3" style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <PdfDisplay pdfFile={pdfFile} pageContent={RegionProvider} />
      </div>
    </div>
  );
};
