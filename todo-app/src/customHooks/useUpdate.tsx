import React from "react";
import { DATA_URL } from "../utils/constants";

const useUpdate = () => {
  const updateData = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`${DATA_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        console.log("Error while updating the data : ", response.status);
      }
      const res = await response.json();
      return true;
    } catch (err) {
      console.log("some error occured while deleting the data : ", err);
      return false;
    }
  };

  return {
    updateData,
  };
};

export default useUpdate;
