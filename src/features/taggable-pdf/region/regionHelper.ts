import { PageClass } from "../../pdf-display/constants/reactPdf";
import { Region } from "./region";

export type PageCoordinates = {
  pdfX: number;
  pdfY: number;
  pageNumber: number;
};

export const getBaseX = () => document.getElementById("eb831180b1c3").getBoundingClientRect().left;
export const getBaseY = () => document.getElementById("eb831180b1c3").getBoundingClientRect().top;
export const getScrollXOffset = () => document.getElementById("eb831180b1c3").scrollLeft;
export const getScrollYOffset = () => document.getElementById("eb831180b1c3").scrollTop;

export const coordinatesForEvent = (event: React.MouseEvent<HTMLDivElement>): PageCoordinates => {
  const allPages = [...document.querySelectorAll("." + PageClass)];
  const page = document.elementsFromPoint(event.clientX, event.clientY).find((x) => x.classList.contains(PageClass));
  if (!page) return null;

  const index = allPages.findIndex((x) => x == page);

  if (page) {
    const pageRect = page.getBoundingClientRect();
    const pdfX = event.clientX - pageRect.left;
    const pdfY = event.clientY - pageRect.top;

    return { pdfX: pdfX, pdfY: pdfY, pageNumber: index + 1 };
  }
};

export const createRegion = (region: Omit<Region, "x" | "y">): Region => {
  const allPages = [...document.querySelectorAll("." + PageClass)];
  const page = allPages[region.pageNumber - 1];
  const pageRect = page.getBoundingClientRect();

  return {
    ...region,
    x: region.pdfX + pageRect.left - getBaseX() + getScrollXOffset(),
    y: region.pdfY + pageRect.top - getBaseY() + getScrollYOffset(),
  };
};
