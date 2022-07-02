import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const StudentRow = ({ address }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {address}
      </th>
      
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            onClick={toggleModal}
            id="checkbox-table-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-table-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>

      {modal && <Modal toggleModal={toggleModal} />}
    </tr>
  );
};

export default StudentRow;
