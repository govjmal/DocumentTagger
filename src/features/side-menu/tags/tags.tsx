import { DraggableTag } from "../../drag-and-drop";

export default function Tags() {
  return (
    <div>
      <DraggableTag tag={{ text: "Tag 1", top: "20px", left: "20px" }} />
      <DraggableTag tag={{ text: "Tag 2", top: "50px", left: "50px" }} />
      <DraggableTag tag={{ text: "Tag 3", top: "80px", left: "80px" }} />
    </div>
  );
}
