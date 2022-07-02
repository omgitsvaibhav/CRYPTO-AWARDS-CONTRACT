import React, { useEffect, useState } from "react";
import NFTCardList from "./NFTCardList";
import { onValue, ref } from "firebase/database";
import { db } from "../../utils/firebase/firebase-config";
import { useAccount } from "wagmi";

const CreateProgram = () => {
  const { data } = useAccount();
  const userAddress = data?.address;

  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const updValues = Object.values(data.listofcourses).map(
          (course, index) => {
            return {
              ...course,
              dbId: Object.keys(data.listofcourses)[index],
            };
          }
        );

        setFilteredCourses(
          updValues.filter((course) => course.account === userAddress)
        );
      }
    });
  }, []);

  return (
    <div
      className="container mx-auto pb-10"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <h1 className="text-xl text-white font-bold text-left my-5">
        Dashboard / My Programs
      </h1>

      <NFTCardList courses={filteredCourses} />
    </div>
  );
};

export default CreateProgram;
