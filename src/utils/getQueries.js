import { useQuery } from "react-query";

export const getTrending = async ({ queryKey }) => {
  const api_key = queryKey[1];

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};
