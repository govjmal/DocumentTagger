import { FaPencil } from "react-icons/fa6";

export default function PencilEditButton({ onClick }) {
  return (
    <button className={`button is-link is-rounded is-small`} onClick={onClick} style={{}}>
      <span className="icon is-small ">
        <FaPencil />
      </span>
    </button>
  );
}
