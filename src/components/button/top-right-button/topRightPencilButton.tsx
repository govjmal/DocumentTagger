import { FaPencil } from "react-icons/fa6";

export default function TopRightPencilButton({ onClick }) {
  return (
    <button
      className="button is-ghost is-rounded is-small"
      onClick={onClick}
      style={{ top: 0, right: 0, position: "absolute" }}>
      <span className="icon">
        <FaPencil />
      </span>
      <span>Edit</span>
    </button>
  );
}
