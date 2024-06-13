import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { A4PageWidthPixels } from "./constants/dimensions";
import { usePdfDisplayStore } from "./pdfDisplayStore";

// Enable PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  pdfFile: File;
  pageContent: ({ pageNumber }) => React.ReactNode;
}

export default ({ pdfFile, pageContent: PageContent }: Props) => {
  const { updatePageDimensions } = usePdfDisplayStore();
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page, index) => {
    if (index !== 1) return;

    const { width, height } = page;
    updatePageDimensions({ width: width, height: height });
  };

  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <Page
        key={`page_${i}`}
        pageNumber={i}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={A4PageWidthPixels}
        className="mt-6"
        onLoadSuccess={(page) => onPageLoadSuccess(page, i)}>
        <PageContent pageNumber={i} />
      </Page>
    );
  }
  return (
    <div>
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
