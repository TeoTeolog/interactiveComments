import { useState } from "react";

function getRandomID(length) {
  return Math.floor(length + Math.random() * 1024 * 1024);
}

export const useData = (key, initialValue, fileData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setError(error);
      return initialValue;
    }
  });

  const saveData = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      setData(data);
      window.localStorage.setItem(key, JSON.stringify(data));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      setData(fileData);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const updateData = async (newData) => {
    try {
      setIsLoading(true);
      setError(null);

      saveData({
        ...data,
        comments: [
          ...data.comments,
          {
            id: getRandomID(data.comments.length),
            ...newData,
            score: 0,
            createdAt: "today",
            user: data.currentUser,
            replies: [],
          },
        ],
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { getData, updateData, isLoading, error, data };
};
