// import { useState } from "react";

// export const useData = (fileName) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({});
//   const fs = require("fs");

//   const saveData = async (data) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       fs.writeFile(fileName, data);

//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   };

//   const getData = async () => {
//     try {
//       setData(require(fileName));
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   };

//   const updateData = async (newData) => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       console.log("data: ", data);
//       console.log("new data: ", newData);

//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.message);
//     }
//   };

//   return { saveData, getData, updateData, isLoading, error, data };
// };

import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
