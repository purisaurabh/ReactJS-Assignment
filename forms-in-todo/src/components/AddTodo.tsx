import React, { useState } from "react";
import * as yup from "yup";
import { ITask } from "../utils/interface";
import { DATA_URL } from "../utils/constants";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Partial<ITask>>({});

  // create the schema
  const validationSchema = yup.object<ITask>({
    title: yup.string().required("Title is required"),
    dueDate: yup.string().required("Due Date is required"),
  });

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: ITask = {
      id: Date.now().toString(),
      title: title,
      dueDate: dueDate,
    };

    try {
      await validationSchema.validate(newTask, { abortEarly: false });
      await createTodo(newTask);
      setTitle("");
      setDueDate("");
    } catch (validationErrors) {
      const newErrors: Partial<ITask> = {};

      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof ITask] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const createTodo = async (task: ITask) => {
    try {
      const response = await fetch(`${DATA_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log("Todo item created successfully");
      } else {
        console.error(
          "Failed to create todo:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6"
        onSubmit={handleCreateTodo}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && (
            <div style={{ color: "red" }}>{errors.dueDate}</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <a
            href="#"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          ></a>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
