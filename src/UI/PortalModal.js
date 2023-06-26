import React from "react";
import ReactDOM from "react-dom";
const PortalModal = ({ onClose }) => {
  const id = document.getElementById("portal-modal");
  return ReactDOM.createPortal(
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4">Modal Title</h2>
          <p className="mb-4">Modal content goes here...</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>,
    id
  );
};

export default PortalModal;
