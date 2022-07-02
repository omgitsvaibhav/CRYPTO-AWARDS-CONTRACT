import React, { useState, useEffect } from "react";
import Adminpage from "./Adminpage";
import Card from "../explore/Card";

const NFTCardList = ({ courses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <div className="mx-auto gap-8 grid grid-cols-4">
        {courses.reverse().map((nft, i) => {
          return (
            <Card
              key={i}
              nftData={nft}
              forAdmin={true}
              studentList={nft.studentList}
              databaseId={nft.dbId}
            />
          );
        })}
      </div>

      <div
        className="fixed bottom-5 right-5 Buttonpopuptext-white overflow-hidden shadow-lg bg-gray-200 h-12 w-12 rounded-full cursor-pointer flex justify-center items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        {/* </Link> */}
      </div>

      <Adminpage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default NFTCardList;
