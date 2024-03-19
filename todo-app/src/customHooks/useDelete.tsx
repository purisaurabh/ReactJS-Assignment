import React, { useState } from "react";
import { DATA_URL } from "../utils/constants";

const useDelete = () => {
  const deleteData = async (id: string) => {
    try {
      const response = await fetch(`${DATA_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error while deleting the data : ", response.status);
        return;
      }

      const data = await response.json();
      return true;
    } catch (error) {
      console.log("Data is not deleted because :", error);
      return false;
    }
  };

  return { deleteData };
};

export default useDelete;
