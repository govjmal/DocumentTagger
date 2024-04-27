import { useTaggablePdfStore } from "../../../taggable-pdf/taggablePdf.store";
import ImportConfigButton from "./import-config-button/import-config-button";
import ExportConfigButton from "./export-config-button/exportConfigButton";

export default function ImportExportSection() {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);

  if (!pdfFile) return <></>;
  return (
    <>
      <p className="menu-label">Import Export</p>
      <ImportConfigButton />
      <ExportConfigButton />
    </>
  );
}
