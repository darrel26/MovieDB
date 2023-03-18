import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTrending } from "../../utils/getQueries";
import TrendingMovieCard from "./TrendingMovieCard";

export default function Hero() {
  const [activeMovie, setActiveMovie] = useState(0);

  const movies = useQuery(
    ["trending", import.meta.env.VITE_TMDB_KEY],
    getTrending
  );
  if (movies.isLoading) {
    return <h1>Loading ...</h1>;
  }

  const moviesData = movies.data.results;

  const handleCardClicked = (e) => {
    setActiveMovie(e.target.getAttribute("index"));
  };

  return (
    <>
      <div className="movie-base">
        <h1>{moviesData[activeMovie].title}</h1>
        <p>{moviesData[activeMovie].overview}</p>
        <p>
          rating: {Math.floor(parseInt(moviesData[activeMovie].vote_average))}
        </p>
        <ul className="btn-hero">
          <li>
            <a href="#" className="btn-cta-hero">
              Watch Now
            </a>
          </li>
          <li>
            <a href="#">Trailer</a>
          </li>
        </ul>
      </div>
      <div className="trending-movie-container">
        <h2>Trending</h2>
        <div className="movie-card-container">
          {movies.data.results.map((movie, index) => (
            <TrendingMovieCard
              getDetails={handleCardClicked}
              key={movie.id}
              index={index}
              img={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
