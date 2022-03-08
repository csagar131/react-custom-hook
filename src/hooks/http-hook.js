import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return [sendRequest, isLoading, error];
};

export default useHttp;

// "https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json"
