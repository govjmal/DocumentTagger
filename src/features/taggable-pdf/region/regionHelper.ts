import { PageClass } from "../../pdf-display/constants/reactPdf";

export const getPage = (pageNumber: number) => [...document.querySelectorAll("." + PageClass)][pageNumber - 1];

export const getPageBaseX = (page: Element) => page.getBoundingClientRect().left + getScrollXOffset();
export const getPageBaseY = (page: Element) => page.getBoundingClientRect().top + getScrollYOffset();

export const getScrollXOffset = () => document.getElementById("eb831180b1c3").scrollLeft;
export const getScrollYOffset = () => document.getElementById("eb831180b1c3").scrollTop;

export const pdfCoordinatesForEvent = (
  event: React.MouseEvent<HTMLDivElement>,
  pageNumber: number
): { x: number; y: number } => {
  const page = getPage(pageNumber);
  if (!page) return null;

  if (page) {
    const pageRect = page.getBoundingClientRect();
    const x = event.clientX - pageRect.left;
    const y = event.clientY - pageRect.top;

    return { x, y };
  }
};
