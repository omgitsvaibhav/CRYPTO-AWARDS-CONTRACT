import React from "react";

const ConfirmModal = ({ name, closeModal, handleAction, isEnrolling }) => {
  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center w-full min-h-screen bg-black bg-opacity-80">
      <div className="w-[25rem] rounded-xl overflow-hidden shadow-lg bg-gray-800 p-4 flex flex-col">
        <h1 className="text-lg text-gray-400 font-bold">
          Do you want to enroll for <span className="text-white">{name}</span>?
        </h1>
        <div className="flex mt-4">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAction}
          >
            {isEnrolling && (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-white animate-spin mr-2 -ml-2"></div>
            )}
            Yes
          </button>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
