import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../utils/firebase/firebase-config";
import CardList from "./CardList";
import { useAccount } from "wagmi";

const Explore = () => {
  const [courses, setCourses] = useState([]);
  const { data } = useAccount();
  const userAddress = data?.address;

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const updValues = Object.values(data.listofcourses).map(
          (course, index) => {
            return {
              ...course,
              dbId: Object.keys(data.listofcourses)[index],
              isEnrolled: !!course.studentList?.find(
                (x) => x.studentAddress === userAddress
              ),
              isCompleted: course?.studentList?.find(
                (x) => x.studentAddress === userAddress
              )?.isCompleted,
            };
          }
        );

        setCourses(updValues);
      }
    });
  }, [userAddress]);

  return (
    <div
      className="container mx-auto pb-10"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <h1 className="text-xl text-white font-bold text-left my-5">
        All Programs
      </h1>
      <CardList courses={courses} />
    </div>
  );
};

export default Explore;
