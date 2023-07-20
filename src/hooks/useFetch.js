import { useEffect, useState } from "react";
import customAxios from "../axios/custom";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const memoizedUrl = useMemo(() => url, [url]);
  // useEffect(() => {

  const fetchData = async () => {
    console.log("fetchData");
    try {
      setLoading(true);
      const response = await customAxios.post(url);

      const resData = await response.data;
      setData(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, fetchData };
};

export default useFetch;
