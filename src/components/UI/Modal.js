import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = props => {
  return <div className={styles.backdrop} onClick={props.clicked} />;
};

const ModalOverlay = props => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop clicked={props.onClose} />, portalEl)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </>
  );
};

export default Modal;
