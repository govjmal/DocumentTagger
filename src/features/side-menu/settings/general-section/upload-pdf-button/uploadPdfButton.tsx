import { useTaggablePdfStore } from "@/features/taggable-pdf/taggablePdf.store";
import { useRef } from "react";

export default function UploadPdfButton() {
  const updatePdf = useTaggablePdfStore((x) => x.updatePdfFile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files[0];
    updatePdf(file);
  };

  return (
    <li>
      <a onClick={handleButtonClick}>
        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        Upload PDF
      </a>
    </li>
  );
}
