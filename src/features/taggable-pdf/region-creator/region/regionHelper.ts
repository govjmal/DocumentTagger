import { PageClass } from "../../../pdf-display/constants/reactPdf";

export type PageCoordinates = {
  pdfX: number;
  pdfY: number;
  x: number;
  y: number;
  pageNumber: number;
};

export const coordinatesForEvent = (event: React.MouseEvent<HTMLDivElement>): PageCoordinates => {
  const allPages = [...document.querySelectorAll("." + PageClass)];
  const page = document.elementsFromPoint(event.clientX, event.clientY).find((x) => x.classList.contains(PageClass));
  if (!page) return null;

  const index = allPages.findIndex((x) => x == page);

  if (page) {
    const pageRect = page.getBoundingClientRect();
    const pdfX = event.clientX - pageRect.left;
    const pdfY = event.clientY - pageRect.top;

    return { pdfX: pdfX, pdfY: pdfY, x: event.clientX, y: event.clientY, pageNumber: index + 1 };
  }
};
