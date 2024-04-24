import UploadPdfButton from "./upload-pdf-menu-item/uploadPdfMenuItem";

export default function GeneralSettings() {
  return (
    <div>
      <ul className="menu-list">
        <li>
          <a>
            <UploadPdfButton />
          </a>
        </li>
        <li>
          <a>Import config</a>
        </li>
        <li>
          <a>Export config</a>
        </li>
      </ul>
    </div>
  );
}
