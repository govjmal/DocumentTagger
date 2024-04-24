import { useTaggablePdfStore } from "./taggablePdf.store";
import Skeleton from "./skeleton/skeleton";

export default function TaggablePdf() {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);

  return <div>{!pdfFile && <Skeleton />}</div>;
}
