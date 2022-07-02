import React, { useState } from "react";
import StudentsEnrolled from "./StudentsEnrolled";

const NFTCard = ({ name, description, image, studentList }) => {
  const [studentModal, setStudentModal] = useState(false);

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-800 p-4 flex flex-col justify-between min-h-[400px]">
        <div>
          <img
            className="object-center object-cover h-[160px] w-full rounded-md"
            src={image}
            alt={name}
          />
          <div className="mt-4 text-left">
            <div className="font-bold text-xl mb-2 text-white text-left">
              {name}
            </div>
            <p className="text-gray-200 text-base">{description}</p>
          </div>
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
          dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setStudentModal(true)}
        >
          Student List
        </button>
      </div>

      
    </>
  );
};

export default NFTCard;
