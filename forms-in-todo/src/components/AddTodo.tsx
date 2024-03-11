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
    <div className="d-flex flex-row m-5">
      <form className="block " onSubmit={handleCreateTodo}>
        <div className="m-10">
          <label>Title:</label>
          <input
            className="rounded visible"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}

        <div className="m-10">
          <label>Due Date:</label>
          <input
            className="rounded"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {errors.dueDate && <div style={{ color: "red" }}>{errors.dueDate}</div>}

        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
