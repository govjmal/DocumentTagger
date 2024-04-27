import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Enable PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  pdfFile: File;
  pageContent: ({ pageNumber }) => React.ReactNode;
}

export default ({ pdfFile, pageContent: PageContent }: Props) => {
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
        className="mt-6">
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
