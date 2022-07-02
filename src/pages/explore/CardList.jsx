import React from "react";
import Card from "./Card";

const CardList = ({ courses }) => {
  return (
    <div className="mx-auto gap-8 grid grid-cols-4">
      {!!courses &&
        courses.map((course, i) => {
          return (
            <Card
              key={i}
              nftData={course}
              databaseId={course.dbId}
              studentList={course.studentList}
            />
          );
        })}
    </div>
  );
};

export default CardList;
