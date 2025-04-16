import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const CompoTwo = () => {
  const { id } = useParams();
  const fetchData = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
  };
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["api2", id],
    queryFn: fetchData,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchOnWindowFocus: true,
    // refetchInterval: 10000,
  });
  return <div>
    {isLoading ? (
      <>Loading...</>
    ) : isError ? (
      <>Error: {error.message}</>
    ) : (
      <>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
        </>
    )}
  </div>
};

export default CompoTwo;
