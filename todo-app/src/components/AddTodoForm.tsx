import React, { useState } from "react";

const AddTodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const [addTodoInput, setAddTodoInput] = useState("");
  return (
    <>
      <div className="d-flex gap-2">
        <input
          type="text"
          value={addTodoInput}
          onChange={(e) => setAddTodoInput(e.target.value)}
        ></input>
        <button
          onClick={() => {
            addTodo(addTodoInput);
            setAddTodoInput("");
          }}
          disabled={!addTodoInput}
        >
          Add Todo
        </button>
      </div>
    </>
  );
};

export default React.memo(AddTodoForm);
