import { useTaggablePdfStore } from "./taggablePdf.store";
import Skeleton from "./skeleton/skeleton";
import { DragAndDrop } from ".";

export default function TaggablePdf() {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);

  return (
    <div>
      {!pdfFile && <Skeleton />}
      {pdfFile && <DragAndDrop pdfFile={pdfFile} />}
    </div>
  );
}
