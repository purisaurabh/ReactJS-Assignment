import { DATA_URL, PAGE_DATA_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  try {
    const data = await fetch(DATA_URL);
    if (!data.ok) {
      throw new Error(`Error Occured : ${data.status}`);
    }
    const response = await data.json();
    return response;
  } catch (err) {
    console.log("Error : ", err);
  }
};

const fetchPageData = async () => {
  try {
    const data = await fetch(PAGE_DATA_URL);
    if (!data.ok) {
      throw new Error(`Error Occured : ${data.status}`);
    }
    const response = await data.json();
    return response;
  } catch (err) {
    console.log("Error : ", err);
  }
};
const useFetch = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  const { data: pageData } = useQuery({
    queryKey: ["page"],
    queryFn: fetchPageData,
  });

  return { data, isError, isLoading, error, pageData };
};

export default useFetch;
