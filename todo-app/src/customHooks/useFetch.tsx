import { DATA_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  try {
    const data = await fetch(DATA_URL);
    if (!data.ok) {
      throw new Error(`Error Occurred: ${data.status}`);
    }
    const response = await data.json();
    return response;
  } catch (err) {
    console.log("Error: ", err);
    throw err; // Re-throw the error to be caught by the useQuery hook
  }
};

const useFetch = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  return { data, isError, isLoading, error };
};

export default useFetch;
