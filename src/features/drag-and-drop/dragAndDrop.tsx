import React, { useEffect, useMemo, useRef } from "react";

interface RegionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pdfCoordinates: { x: number; y: number };
}

const Region: React.FC<RegionProps> = ({ x, y, width, height, pdfCoordinates }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        border: "1px solid red",
        pointerEvents: "none", // Prevent region from capturing mouse events
      }}>
      <div
        style={{ position: "absolute", top: -20, left: 0, color: "white", backgroundColor: "red", padding: "4px 8px" }}>
        {`PDF X: ${pdfCoordinates.x.toFixed(2)}, PDF Y: ${pdfCoordinates.y.toFixed(2)}`}
      </div>
    </div>
  );
};

import { Document, Page, pdfjs } from "react-pdf";

// Enable PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfFile: File;
  setPdfPages: (pages: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile, setPdfPages }) => {
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfPages(numPages);
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

import { useState } from "react";

const App = ({ pdfFile }: { pdfFile: File }) => {
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [regions, setRegions] = useState<{ x: number; y: number; width: number; height: number; pageNumber: number }[]>(
    []
  );
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentRegion, setCurrentRegion] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  );
  const [pdfScale, setPdfScale] = useState<number>(1);
  const [pdfPages, setPdfPages] = useState<number>(1);

  useEffect(() => {
    function updateDimensions() {
      if (pdfContainerRef.current) {
        const rect = pdfContainerRef.current.getBoundingClientRect();
        setPdfScale(rect.width / pdfContainerRef.current.offsetWidth);
      }
    }
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartPosition({ x: event.clientX, y: event.clientY });
    setIsDrawing(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && startPosition) {
      const currentX = startPosition.x;
      const currentY = startPosition.y;
      const width = event.clientX - currentX;
      const height = event.clientY - currentY;
      setCurrentRegion({ x: currentX, y: currentY, width, height });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && startPosition && currentRegion) {
      setRegions((prevRegions) => [...prevRegions, { ...currentRegion, pageNumber: 1 }]);
    }
    setIsDrawing(false);
    setStartPosition(null);
    setCurrentRegion(null);
  };

  const convertToPdfCoordinates = useMemo(
    () => (x: number, y: number, pageNumber: number) => {
      const pdfViewerElement = pdfContainerRef.current?.querySelectorAll(".react-pdf__Page")[pageNumber];
      if (pdfViewerElement) {
        const pageRect = pdfViewerElement.getBoundingClientRect();
        const pdfX = (x - pageRect.left - window.scrollX) / pdfScale;
        const pdfY = (y - pageRect.top - window.scrollY) / pdfScale; // Calculate Y coordinate relative to the pageRect's top
        return { x: pdfX, y: pdfY };
      }
      return { x: 0, y: 0 }; // Return default coordinates if page is not found
    },
    [pdfScale]
  );

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100vh" }}>
      {/* <div> */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div ref={pdfContainerRef}>
          <PDFViewer pdfFile={pdfFile} setPdfPages={setPdfPages} />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }}>
          {regions.map((region, index) => (
            <Region
              key={index}
              x={region.x}
              y={region.y}
              width={region.width}
              height={region.height}
              pdfCoordinates={convertToPdfCoordinates(region.x, region.y, region.pageNumber)}
            />
          ))}
          {isDrawing && currentRegion && (
            <div
              style={{
                position: "absolute",
                left: currentRegion.x,
                top: currentRegion.y,
                width: currentRegion.width,
                height: currentRegion.height,
                border: "1px dashed red",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
