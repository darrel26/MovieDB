import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQueries } from "react-query";
import {
  getMoviesTrending,
  getTopRated,
  getTvShowsTrending,
} from "../../utils/getQueries";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieCard from "./MovieCard";

export default function Home() {
  const [active, setActive] = useState({
    type: "trending",
    index: 0,
  });

  let urlPath = useLocation().pathname;

  const reqHome = useQueries([
    {
      queryKey: ["trending", import.meta.env.VITE_TMDB_KEY],
      queryFn: urlPath === "/movies" ? getMoviesTrending : getTvShowsTrending,
    },
    {
      queryKey: [
        "trending",
        import.meta.env.VITE_TMDB_KEY,
        urlPath === "/movies" ? "movie" : "tv",
      ],
      queryFn: getTopRated,
    },
  ]);

  let trending;
  let topRated;

  if (reqHome[0].isSuccess && reqHome[1].isSuccess) {
    trending = reqHome[0].data.results;
    topRated = reqHome[1].data.results;
    document.documentElement.style.setProperty(
      "--bg-img",
      `url("https://image.tmdb.org/t/p/original${
        eval(active.type)[active.index].backdrop_path
      }")`
    );
  }

  if (reqHome[0].isLoading || reqHome[1].isLoading) {
    return (
      <div className="home-spinner">
        <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />
      </div>
    );
  }

  const handleCardClick = (e) => {
    const [type, index] = e.target.getAttribute("index").split(" ");
    setActive({ type, index });
    document.documentElement.style.setProperty(
      "--bg-img",
      `url("https://image.tmdb.org/t/p/original${
        eval(type)[index].backdrop_path
      }")`
    );
  };

  return (
    <div className="home-container">
      <div className="movie-details">
        {reqHome.isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />
        ) : (
          <>
            {urlPath === "/movies" ? (
              eval(active.type)[active.index].title.length >= 32 ? (
                <h2 style={{ fontSize: "1.5rem" }} id="movie-title">
                  {eval(active.type)[active.index].title}
                </h2>
              ) : (
                <h2 id="movie-title">
                  {eval(active.type)[active.index].title}
                </h2>
              )
            ) : eval(active.type)[active.index].name.length >= 32 ? (
              <h2 style={{ fontSize: "1.5rem" }} id="movie-title">
                {eval(active.type)[active.index].name}
              </h2>
            ) : (
              <h2 id="movie-title">{eval(active.type)[active.index].name}</h2>
            )}
            <p>
              {eval(active.type)[active.index].overview.length > 258
                ? eval(active.type)
                    [active.index].overview.slice(0, 258)
                    .concat([" ..."])
                : eval(active.type)[active.index].overview}
            </p>
          </>
        )}
        <div className="cta-container">
          <a href="#" id="cta-btn">
            Watch Now
          </a>
          <Link
            to={
              reqHome[0].isSuccess &&
              reqHome[1].isSuccess &&
              `${urlPath}/${eval(active.type)[active.index].id}`
            }
            id={
              reqHome[0].isSuccess &&
              reqHome[1].isSuccess &&
              eval(active.type)[active.index].id
            }
            onClick={() =>
              console.log(`/${eval(active.type)[active.index].id}`)
            }
          >
            More
          </Link>
        </div>
      </div>
      <div className="movie-list-container trending">
        <h3>Trending</h3>
        {reqHome.isLoading ? (
          <div className="movie-list-loading-container trending">
            <FontAwesomeIcon
              icon={faSpinner}
              className="loading-spinner"
              style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
            />
          </div>
        ) : (
          <div className="movie-list-cards-container">
            {trending.map((movie, index) => (
              <MovieCard
                key={movie.id}
                index={`trending ${index}`}
                handleCardClick={handleCardClick}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        )}
      </div>
      {/* Top Rated */}
      <div className="movie-list-container top-rated">
        <h3>Top Rated</h3>
        {reqHome.isLoading ? (
          <div className="movie-list-loading-container top-rated">
            <FontAwesomeIcon
              icon={faSpinner}
              className="loading-spinner"
              style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
            />
          </div>
        ) : (
          <div className="movie-list-cards-container top-rated">
            {topRated.map((movie, index) => (
              <MovieCard
                key={movie.id}
                index={`topRated ${index}`}
                handleCardClick={handleCardClick}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
