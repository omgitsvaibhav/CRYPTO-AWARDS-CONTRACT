import React from "react";
import StudentRow from "./StudentRow";

const Students = ({ students }) => {
  return (
    <tbody>
      {students.map((student, i) => {
        return (
          <StudentRow
            key={i}
            address={students[i].address}
            completed={students[i].completed}
            course={students[i].course}
          />
        );
      })}
    </tbody>
  );
};

export default Students;
