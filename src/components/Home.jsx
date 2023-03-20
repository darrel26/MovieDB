import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMoviesTrending, getTvShowsTrending } from "../utils/getQueries";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [active, setActive] = useState(0);

  let urlPath = useLocation().pathname;

  const reqTrending = useQuery(
    ["trending", import.meta.env.VITE_TMDB_KEY],
    urlPath === "/movies" ? getMoviesTrending : getTvShowsTrending
  );

  console.log(reqTrending);

  let movies;

  if (reqTrending.isSuccess) {
    movies = reqTrending.data.results;

    document.documentElement.style.setProperty(
      "--bg-img",
      `url("https://image.tmdb.org/t/p/original/${movies[active].backdrop_path}")`
    );
  }

  const handleCardClick = (e) => {
    setActive(e.target.getAttribute("index"));
    document.documentElement.style.setProperty(
      "--bg-img",
      `url("https://image.tmdb.org/t/p/original/${movies[active].backdrop_path}")`
    );
  };

  return (
    <div className="home-container">
      <div className="movie-details">
        {reqTrending.isLoading ? (
          <FontAwesomeIcon icon={faSpinner} />
        ) : (
          <>
            {urlPath === "/movies" ? (
              movies[active].title.length >= 32 ? (
                <h2 style={{ fontSize: "24px" }} id="movie-title">
                  {movies[active].title}
                </h2>
              ) : (
                <h2 id="movie-title">{movies[active].title}</h2>
              )
            ) : movies[active].name.length >= 32 ? (
              <h2 style={{ fontSize: "24px" }} id="movie-title">
                {movies[active].name}
              </h2>
            ) : (
              <h2 id="movie-title">{movies[active].name}</h2>
            )}
            {/* {movies[active].name.length >= 32 ? (
              <h2 style={{ fontSize: "24px" }} id="movie-title">
                {movies[active].name}
              </h2>
            ) : (
              <h2 id="movie-title">{movies[active].name}</h2>
            )} */}
            <p>
              {movies[active].overview.length > 258
                ? movies[active].overview.slice(0, 258).concat([" ..."])
                : movies[active].overview}
            </p>
          </>
        )}
        <div className="cta-container">
          <a href="#" id="cta-btn">
            Watch Now
          </a>
          <a href="#">More</a>
        </div>
      </div>
      <div className="trending-container">
        <h3>Trending</h3>
        {reqTrending.isLoading ? (
          <div className="trending-loading-container">
            <FontAwesomeIcon
              icon={faSpinner}
              className="loading-spinner"
              style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
            />
          </div>
        ) : (
          <div className="trending-cards-container">
            {movies.map((movie, index) => (
              <div
                className="trending-card"
                index={index}
                key={movie.id}
                onClick={handleCardClick}
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
