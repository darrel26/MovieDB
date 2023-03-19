import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTrending } from "../../utils/getQueries";
import TrendingMovieCard from "./TrendingMovieCard";

export default function Hero({ active, setActive }) {
  const movies = useQuery(
    ["trending", import.meta.env.VITE_TMDB_KEY],
    getTrending
  );
  if (movies.isLoading) {
    return <h1>Loading ...</h1>;
  }

  const moviesData = movies.data.results;

  document.documentElement.style.setProperty(
    "--bg-container-img",
    `url("https://image.tmdb.org/t/p/original/${moviesData[active].backdrop_path}")`
  );

  const handleCardClicked = (e) => {
    setActive(e.target.getAttribute("index"));
    document.documentElement.style.setProperty(
      "--bg-container-img",
      `url("https://image.tmdb.org/t/p/original/${moviesData[active].backdrop_path}")`
    );
  };

  return (
    <>
      <div className="movie-base">
        <div className="movie-base-container">
          <h1>{moviesData[active].title}</h1>
          <p>{moviesData[active].overview}</p>
          <p>rating: {Math.floor(parseInt(moviesData[active].vote_average))}</p>
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
