import { useMutation } from "@tanstack/react-query";
import { DATA_URL } from "../utils/constants";
import { TodoItem } from "../utils/interface";

const addPost = async (newTask: TodoItem) => {
  try {
    const response = await fetch(DATA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    return true;
  } catch (err) {
    console.log("some error occured : ", err);
    return false;
  }
};

const usePost = () => {
  const { mutate } = useMutation({
    mutationFn: addPost,
  });

  return {
    mutate,
  };
};
export default usePost;
