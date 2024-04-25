import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { usePdfDisplayStore } from "./pdfDisplay.store";

// Enable PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  pdfFile: File;
}

export default ({ pdfFile }: Props) => {
  const setPdfRef = usePdfDisplayStore((x) => x.updatePdfRef);
  const refCallback = useCallback((ref: HTMLDivElement) => {
    setPdfRef(ref);
  }, []);
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <Page
        key={`page_${i}`}
        pageNumber={i}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={800}
        className="mt-6"></Page>
    );
  }
  return (
    <div ref={refCallback}>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        className="has-background-grey-light is-full is-align-items-center is-flex is-flex-direction-column pb-6"
        loading={() => <>loading...</>}>
        {pages}
      </Document>
    </div>
  );
};
