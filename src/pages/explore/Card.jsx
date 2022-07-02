import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { ref, update } from "firebase/database";
import { useAccount } from "wagmi";
import { db } from "../../utils/firebase/firebase-config";
import StudentsEnrolled from "../create-program/StudentsEnrolled";
import { ethers } from "ethers";

import { ExternalLink } from "react-feather";

const ContractAddress = "0x58cf666b9c2626974c3e046ab52d9ce459619dff";

const ContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newuri",
				"type": "string"
			}
		],
		"name": "setURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "showMintCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function interactContract(){
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const numberContract = new ethers.Contract(ContractAddress, ContractABI, provider.getSigner());

	await numberContract.mint();
}


const Card = ({
  nftData,
  forAdmin = false,
  studentList,
  databaseId,
  mintNFT
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { data } = useAccount();
  const userAddress = data?.address;
  const [isEnrolling, setIsEnrolling] = useState(false);

  const updateStudentlist = async () => {
    try {
      const updatedStudentList = !!studentList ? [...studentList] : [];
      await update(ref(db, `listofcourses/${databaseId}`), {
        studentList: [
          ...updatedStudentList,
          {
            studentAddress: userAddress,
            isCompleted: false,
            isClaimed: false,
          },
        ],
      });
      setIsEnrolling(false);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full rounded-xl overflow-hidden shadow-lg bg-gray-800 p-4 flex flex-col justify-between">
        <div className="mb-6 relative">
          <div className="h-20 w-full bg-gray-700 rounded-md absolute top-0 left-0"></div>
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-900 mx-auto mt-3"
            // style={{ paddingBottom: "100%" }}
          >
            <img
              className="absolute top-0 left-0 object-contain object-center h-full w-full"
              src={nftData.image}
              alt={nftData.name}
            />
          </div>
          <div className="mt-4 text-left">
            <div className="font-bold text-xl mb-2 text-white text-left capitalize">
              {nftData.name}
              {/* <br /> {nftData.dbId} */}
            </div>
            <p
              className="text-gray-200 text-base overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {nftData.description}
            </p>
            <a
              href={nftData.link}
              target="_blank"
              className="text-sm font-semibold text-white underline mt-2 flex items-center hover:text-blue-400"
            >
              Learn more <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>

        {forAdmin ? (
          <button
            type="button"
            className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={() => setIsStudentModalOpen(!isStudentModalOpen)}
          >
            Student List
          </button>
        ) : nftData.isCompleted ? (
          <button
            className="disabled:bg-gray-300 text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={mintNFT}
          >
            Claim NFT
          </button>
        ) : (
          <button
            type="button"
            className="disabled:bg-gray-300 disabled:text-gray-600 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={toggleModal}
            disabled={nftData?.isEnrolled || !userAddress}
          >
            {nftData?.isEnrolled ? "Enrolled" : "Enroll Now"}
          </button>
        )}
        <button onClick={interactContract}>Claim</button>
		    <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
        type="application/javascript"></script>
      </div>

      {isOpen && (
        <ConfirmModal
          name={nftData.name}
          description={nftData.description}
          databaseId={databaseId}
          closeModal={toggleModal}
          handleAction={updateStudentlist}
          isEnrolling={isEnrolling}
        />
      )}

      {isStudentModalOpen && (
        <StudentsEnrolled
          studentList={studentList}
          databaseId={databaseId}
          closeModal={() => setIsStudentModalOpen(false)}
        />
      )}
    </>
  );
};

export default Card;
