import { FaPencil } from "react-icons/fa6";

export default function TopRightPencilButton({ onClick }) {
  return (
    <button className="button is-ghost" onClick={onClick} style={{ top: 0, right: 0, position: "absolute" }}>
      <div className="icon">
        <FaPencil />
      </div>
    </button>
  );
}
