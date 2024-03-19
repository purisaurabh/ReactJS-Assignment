import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { TodoItem } from "../utils/interface";
import useFetch from "../customHooks/useFetch";
export const DataContext = createContext<TodoItem[]>([]);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<DataProviderProps> = ({
  children,
}) => {
  const todoData = useFetch();

  console.log("Data from useFetch : ", todoData);
  const [data, setData] = useState<TodoItem[]>([]);

  useEffect(() => {
    setData(todoData);
  }, [todoData]);

  console.log("Data is context : ", data);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
