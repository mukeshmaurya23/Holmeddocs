import { useEffect, useState } from "react";
import customAxios from "../axios/custom";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.post(url);
        const resData = await response.data;
        setData(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return { data };
};

export default useFetch;
