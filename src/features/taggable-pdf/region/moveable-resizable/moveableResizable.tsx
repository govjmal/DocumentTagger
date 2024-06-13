import { EventSuppressedDiv } from "@/components";
import { Field, Region } from "@/features/taggable-pdf/types/region";
import { useTaggablePdfStore } from "../../taggablePdf.store";
import ResizeSide from "./resize-side/resizeSide";
import { Side } from "../../types/side";

export interface Props {
  region: Region;
  field?: Field;
  style: React.CSSProperties;
  children: React.ReactElement;
}

export default function MoveableResizable({ region, field, style, children }: Props) {
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);

  const onMouseDown = (e) => {
    e.stopPropagation();

    const dragOriginatingCoordinates = { x: e.clientX, y: e.clientY };
    if (field)
      updateRegion(region, {
        isActive: true,
        fields: [
          ...region.fields.filter((x) => x !== field),
          { ...field, dragClickPositionOffset: dragOriginatingCoordinates }
        ]
      });
    else updateRegion(region, { dragClickPositionOffset: dragOriginatingCoordinates, isActive: true });
  };

  const onClick = (e) => {
    e.stopPropagation();
    updateRegion(region, { isActive: true });
  };

  const onClickSide = (side: Side) => {
    if (field)
      updateRegion(region, {
        fields: [...region.fields.filter((x) => x !== field), { ...field, sideBeingResized: side }]
      });
    else updateRegion(region, { sideBeingResized: side });
  };

  return (
    <EventSuppressedDiv allowMouseMove allowMouseUp>
      <div onMouseDown={onMouseDown} onClick={onClick} style={style}>
        <ResizeSide onClick={onClickSide} side="top" />
        <ResizeSide onClick={onClickSide} side="right" />
        <ResizeSide onClick={onClickSide} side="bottom" />
        <ResizeSide onClick={onClickSide} side="left" />
        {children}
      </div>
    </EventSuppressedDiv>
  );
}
