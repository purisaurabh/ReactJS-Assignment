import React from "react";

const ShowSearchTodo = ({
  id,
  title,
  completed,
}: {
  id: string;
  title: string;
  completed: boolean;
}) => {
  return (
    <>
      <div>
        <p>ID: {id}</p>
        <p>Title: {title}</p>
        <p>Completed: {completed ? "Yes" : "No"}</p>
      </div>
    </>
  );
};

export default React.memo(ShowSearchTodo);
