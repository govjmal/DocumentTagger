import { useDrag } from "react-dnd";

interface Props {
  tag: any;
}

export default ({ tag }: Props) => {
  const [{ isDragging }, drag] = useDrag({
    type: "tag",
    item: { tag },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        cursor: "move",
        border: "1px solid black",
        padding: "5px",
        margin: "5px",
        opacity: isDragging ? 0.5 : 1,
        // position: "absolute",
        left: tag.left,
        top: tag.top,
        //   zIndex: 1000, // Ensure the tag appears above the PDF
      }}>
      {tag.text}
    </div>
  );
};
