import { useRef } from "react";
import { useTaggablePdfStore } from "../../../taggable-pdf/taggablePdf.store";

export default function UploadPdfButton() {
  const updatePdf = useTaggablePdfStore((x) => x.updatePdfFile);
  const fileInputRef = useRef<any>(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    updatePdf(file);
  };

  return (
    <div onClick={handleButtonClick}>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
      Upload PDF
    </div>
  );
}
