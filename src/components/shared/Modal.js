import React from "react";
import "styles/_modal.scss"

const Modal = (props) => {
  const {
    children,
    isOpen,
    onClose,
    onContinue,
    closeLabel = "Close",
    continueLabel = "Continue",
  } = props;
  return (
    isOpen && (
      <div className="modal-container" onClick={()=> onClose()}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">{children}</div>
            <div className="modal-button">
              <button className="btn btn-close" onClick={() => onClose()}>
                {closeLabel}
              </button>
              <button className="btn btn-add" onClick={() => onContinue()}>
                {continueLabel}
              </button>
            </div>
        </div>
      </div>
    )
  );
};

export default Modal;
