import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      if(requestConfig.method === "POST"){
        applyData({
          name : data.name,
          text : requestConfig.body.text
        })
      }
      else{
        applyData(data);
      }

    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [applyData]);

  return [sendRequest, isLoading, error];
};

export default useHttp;

// "https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json"
