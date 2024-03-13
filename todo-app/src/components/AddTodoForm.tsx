import { HomeIcon, Plus } from "lucide-react";
import React, { useState } from "react";

const AddTodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const [addTodoInput, setAddTodoInput] = useState("");

  return (
    <>
      <div className="mx-auto mt-10 max-w-md">
        <div className="flex flex-col gap-6">
          <input
            type="text"
            value={addTodoInput}
            onChange={(e) => setAddTodoInput(e.target.value)}
            placeholder="What do you need to do?"
            className="input border-0 w-full p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200 ease-in-out transform focus:scale-105"
            style={{ backgroundColor: "#f9f9f9" }}
          />

          {/* Add Button */}
          <button
            onClick={() => {
              addTodo(addTodoInput);
              setAddTodoInput("");
            }}
            className="btn d-flex items-center justify-center gap-2 w-full text-white  rounded-lg shadow-md font-medium tracking-wide cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105"
            style={{ backgroundColor: "#4f46e5" }}
          >
            <Plus className="w-6 h-6" />
            Add Task
          </button>
        </div>
      </div>

      {/* <div className="d-flex gap-2">
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
        >
          Add Todo
        </button>
      </div> */}
    </>
  );
};

export default React.memo(AddTodoForm);
