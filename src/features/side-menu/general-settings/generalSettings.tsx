import ExportConfigButton from "./export-config-button/exportConfigButton";
import ImportConfigButton from "./import-config-button/import-config-button";
import UploadPdfButton from "./upload-pdf-button/uploadPdfButton";

export default function GeneralSettings() {
  return (
    <div>
      <ul className="menu-list">
        <UploadPdfButton />
        <ImportConfigButton />
        <ExportConfigButton />
      </ul>
    </div>
  );
}
