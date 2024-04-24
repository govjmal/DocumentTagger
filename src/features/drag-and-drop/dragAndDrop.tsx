import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DraggableTag from "./draggable-tag/draggableTag";
import "./dragAndDrop.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  pdfFile: File;
}

export default ({ pdfFile }: Props) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [tags, setTags] = useState<any>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDrop = (page: any) => (item: any) => {
    const newTag = item.tag;
    alert("drop");
    setTags([...tags, { page, tag: newTag }]);
  };

  const pages = [];
  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <Page
        key={`page_${i}`}
        pageNumber={i}
        onDrop={handleDrop(i)}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={800}
        className="mt-6">
        {tags.map((tag: any, index: number) => tag.page === i && <DraggableTag key={index} tag={tag} />)}
      </Page>
    );
  }

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
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
