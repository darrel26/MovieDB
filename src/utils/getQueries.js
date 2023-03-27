export const getMoviesTrending = async ({ queryKey }) => {
  const api_key = queryKey[1];

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getTvShowsTrending = async ({ queryKey }) => {
  const api_key = queryKey[1];

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getDetails = async ({ queryKey }) => {
  const api_key = queryKey[1];
  const typeDetails = queryKey[2];
  const movieId = queryKey[3];

  const res = await fetch(
    `https://api.themoviedb.org/3/${typeDetails}/${movieId}?api_key=${api_key}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getCredits = async ({ queryKey }) => {
  const api_key = queryKey[1];
  const typeDetails = queryKey[2];
  const movieId = queryKey[3];

  const res = await fetch(
    `https://api.themoviedb.org/3/${typeDetails}/${movieId}/credits?api_key=${api_key}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getSimilar = async ({ queryKey }) => {
  const api_key = queryKey[1];
  const typeDetails = queryKey[2];
  const movieId = queryKey[3];

  const res = await fetch(
    `https://api.themoviedb.org/3/${typeDetails}/${movieId}/similar?api_key=${api_key}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getRecommendation = async ({ queryKey }) => {
  const api_key = queryKey[1];
  const typeDetails = queryKey[2];
  const movieId = queryKey[3];

  const res = await fetch(
    `https://api.themoviedb.org/3/${typeDetails}/${movieId}/recommendations?api_key=${api_key}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};

export const getTopRated = async ({ queryKey }) => {
  const api_key = queryKey[1];
  const typeDetails = queryKey[2];

  const res = await fetch(
    `https://api.themoviedb.org/3/${typeDetails}/top_rated?api_key=${api_key}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("api_key is not ok");
  }

  return res.json();
};
