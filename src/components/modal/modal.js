import "./modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <strong className="modal-title">Add product</strong>
        {children}
      </div>
    </div>
  );
};

export default Modal;
