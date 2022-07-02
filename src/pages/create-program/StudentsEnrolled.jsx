import React from "react";
import { db } from "../../utils/firebase/firebase-config";
import { update, ref } from "firebase/database";
import { useAccount } from "wagmi";
import { X } from "react-feather";

const StudentsEnrolled = ({ studentList, databaseId, closeModal }) => {
  const { data } = useAccount();

  const updateStudentlist = async (index) => {
    try {
      update(ref(db, `listofcourses/${databaseId}/studentList/${index}`), {
        isCompleted: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black bg-opacity-80 fixed top-0 right-0 h-full w-full flex items-center justify-center z-40">
      {studentList ? (
        <>
          <table className="text-sm text-left text-gray-500 rounded-xl overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Completed
                </th>
                <th scope="col" className="px-6 py-3">
                  Claimed
                </th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {studentList[i].studentAddress}
                    </th>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={() => updateStudentlist(i)}
                          checked={studentList[i].isCompleted}
                        />
                        <label htmlFor="checkbox-table-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td>{studentList[i].isClaimed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-center text-white font-medium text-xl">
          No students
        </div>
      )}

      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white absolute top-10 right-10"
        onClick={closeModal}
      >
        <X />
      </button>
    </div>
  );
};

export default StudentsEnrolled;
