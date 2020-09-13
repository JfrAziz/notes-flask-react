import React from "react";
import "styles/_modal.scss"
import Button from "shared/Button";

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
              <Button className="btn-close" onClick={() => onClose()}>
                {closeLabel}
              </Button>
              <Button className="btn-add" onClick={() => onContinue()}>
                {continueLabel}
              </Button>
            </div>
        </div>
      </div>
    )
  );
};

export default Modal;
