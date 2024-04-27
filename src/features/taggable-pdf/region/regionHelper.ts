import { PageClass } from "../../pdf-display/constants/reactPdf";

export type PdfCoordinates = {
  x: number;
  y: number;
};

export const getPage = (pageNumber: number) => [...document.querySelectorAll("." + PageClass)][pageNumber - 1];

export const getPageBaseX = (page: Element) => {
  const pageLeft = page.getBoundingClientRect().left + getScrollXOffset();
  return pageLeft;
};

export const getPageBaseY = (page: Element) => {
  const pageTop = page.getBoundingClientRect().top + getScrollYOffset();
  return pageTop;
};

export const getScrollXOffset = () => document.getElementById("eb831180b1c3").scrollLeft;
export const getScrollYOffset = () => document.getElementById("eb831180b1c3").scrollTop;

export const pdfCoordinatesForEvent = (event: React.MouseEvent<HTMLDivElement>, pageNumber: number): PdfCoordinates => {
  const page = getPage(pageNumber);
  if (!page) return null;

  if (page) {
    const pageRect = page.getBoundingClientRect();
    const x = event.clientX - pageRect.left;
    const y = event.clientY - pageRect.top;

    return { x, y };
  }
};
