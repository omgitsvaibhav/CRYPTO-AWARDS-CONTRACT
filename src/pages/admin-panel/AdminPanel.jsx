import React from "react";
import Students from "./Students";
import { allStudents } from "./studentList";

const AdminPanel = () => {
  return (
    <div
      className="container mx-auto p-10 "
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <h1 className="text-xl text-white font-bold text-center my-5">
        Admin panel
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Address
              </th>
              <th scope="col" className="px-6 py-3">
                Course Enrolled
              </th>
              <th scope="col" className="px-6 py-3">
                Completed
              </th>
            </tr>
          </thead>

          <Students students={allStudents} />
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
