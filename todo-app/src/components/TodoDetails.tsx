import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DATA_URL } from "../utils/constants";
import { TodoItem } from "../utils/interface";
import { useQuery } from "@tanstack/react-query";

const getData = async (id: string) => {
  try {
    const response = await fetch(`${DATA_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const TodoDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["details"],
    queryFn: () => getData(id ?? " "),
  });

  if (!id) {
    // Handle the case where id is undefined
    return <p>No ID provided</p>;
  }
  return (
    <div>
      <h1>{data?.id}</h1>
      <h1>{data?.title}</h1>
      <h1>
        {data && data.completed ? <p>Completed</p> : <p>Not Completed</p>}
      </h1>
    </div>
  );
};

export default React.memo(TodoDetails);
