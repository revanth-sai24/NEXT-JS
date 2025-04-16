import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompoOne() {
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;

    // setTimeout(() => {
    // }, 2000);
  };
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["api1"],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 1, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    enabled: true,
  });

  const fetchingData = async () => {
    await refetch();
  };
  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error: {error.message}</>;
  return (
    <>
      TanStack Query
      <button onClick={fetchingData}>Fetch data</button>
      <table border={1}>
        <thead>
          <tr>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td
                onClick={() => navigate(`/item/${item.id}`)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                {item.id}
              </td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Tanstack /> */}
    </>
  );
}

export default CompoOne;
