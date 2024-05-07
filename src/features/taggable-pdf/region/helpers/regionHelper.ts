import { PageClass } from "../../../pdf-display/constants/reactPdf";
import { Location } from "../../types/region";
import { MinHeight, MinWidth } from "../constants/region";

export const getPage = (pageNumber: number) => [...document.querySelectorAll("." + PageClass)][pageNumber - 1];

export const getPageBaseX = (page: Element) => page.getBoundingClientRect().left + getScrollXOffset();
export const getPageBaseY = (page: Element) => page.getBoundingClientRect().top + getScrollYOffset();

export const getScrollXOffset = () => document.getElementById("eb831180b1c3").scrollLeft;
export const getScrollYOffset = () => document.getElementById("eb831180b1c3").scrollTop;

export const widthOrMinWidth = (width: number) => (width < MinWidth ? MinWidth : width);
export const heightOrMinHeight = (height: number) => (height < MinHeight ? MinHeight : height);
export const yOrMinHeight = (newY: number, currentLocation: Omit<Location, "pageNumber">) =>
  currentLocation.y + currentLocation.height > newY + MinHeight ? newY : currentLocation.y;
export const xOrMinWidth = (newX: number, currentLocation: Omit<Location, "pageNumber">) =>
  currentLocation.x + currentLocation.width > newX + MinWidth ? newX : currentLocation.x;

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
