import React, { useRef, useState } from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef();
  const [mouseDownInside, setMouseDownInside] = useState(false);

  const handleMouseDown = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      setMouseDownInside(true);
    } else {
      setMouseDownInside(false);
    }
  };

  const handleMouseUp = (e) => {
    if (
      !mouseDownInside &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" ref={modalRef}>
            {children}
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default Modal;
