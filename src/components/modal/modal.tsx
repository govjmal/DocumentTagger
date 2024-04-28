interface Props {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  additionalButtons?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({ title, children, onClose, onSubmit, additionalButtons }: Props) {
  return (
    <div className="modal is-active are-small">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ width: "800px" }}>
        <header className="modal-card-head is-shadowless has-background-black-bis">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body has-background-black-bis">{children}</section>
        <footer className="modal-card-foot has-background-black-bis is-justify-content-space-between">
          <div className="buttons">{additionalButtons}</div>
          <div className="buttons">
            <button className="button" onClick={onClose}>
              Cancel
            </button>
            <button className="button is-success" onClick={onSubmit}>
              Save
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
