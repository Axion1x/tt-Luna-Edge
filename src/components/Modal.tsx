import React from "react";
import Button from "./Button";

interface IList {
  name: string;
  image: string;
}

interface ModalProps {
  list: IList[];
  closeModal: () => void;
  handleSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ list, closeModal, handleSave }) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-opacity-50 z-40">
      <div
        className="flex flex-col items-center border-2 
    border-amber-50 rounded-lg bg-dark w-120 min-h-120 p-5 bg-amber-50 absolute 
    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <button onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7 right-1 absolute top-1 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl mb-4">Your Selected Team</h2>
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col flex-grow">
            {list.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex flex-row items-center mb-4 border-2 rounded-xl p-2 border-gray-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-1/4 h-auto object-contain"
                />
                <div className="flex-grow text-3xl">{item.name}</div>
              </div>
            ))}
          </div>
          <div className="mb-auto flex flex-row items-center justify-end">
            <div className="mr-5 cursor-pointer" onClick={closeModal}>
              Cancel
            </div>
            <Button handleClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
