import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataReducer, initialState } from "../reducers/DataReducer";
import { getPostData, getUserData } from "../services/DataServices";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(DataReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostData(dataDispatch, setIsLoading);
    getUserData(dataDispatch, setIsLoading);
  }, []);

  return (
    <DataContext.Provider
      value={{ dataState, dataDispatch, isLoading, setIsLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
