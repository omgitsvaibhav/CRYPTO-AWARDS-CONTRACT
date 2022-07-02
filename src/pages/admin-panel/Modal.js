import React from "react";

export default function Modal({ toggleModal }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">CONFIRMATION</h3>
          <svg
            onClick={toggleModal}
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="mt-4">
          <p className="mb-4 text-sm">ARE YOU SURE?</p>
          <button
            onClick={toggleModal}
            className="px-2 py-1 text-white bg-green-600 rounded"
          >
            YES
          </button>
          <button
            onClick={toggleModal}
            className="px-2 py-1 text-white bg-red-600 rounded"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
