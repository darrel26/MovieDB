import React from "react";
import { useQueries, useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCredits,
  getDetails,
  getRecommendation,
  getSimilar,
} from "../utils/getQueries";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./NavBar";

export default function MovieDetails() {
  const navigate = useNavigate();
  const [type, movieId] = useLocation().pathname.split("/").splice(1, 2);

  const reqDetails = useQueries([
    {
      queryKey: [
        "movie-details",
        import.meta.env.VITE_TMDB_KEY,
        `${type === "movies" ? "movie" : "tv"}`,
        movieId,
      ],
      queryFn: getDetails,
    },
    {
      queryKey: [
        "movie-credits",
        import.meta.env.VITE_TMDB_KEY,
        `${type === "movies" ? "movie" : "tv"}`,
        movieId,
      ],
      queryFn: getCredits,
    },
    {
      queryKey: [
        "movie-similar",
        import.meta.env.VITE_TMDB_KEY,
        `${type === "movies" ? "movie" : "tv"}`,
        movieId,
      ],
      queryFn: getSimilar,
    },
    {
      queryKey: [
        "movie-recommendation",
        import.meta.env.VITE_TMDB_KEY,
        `${type === "movies" ? "movie" : "tv"}`,
        movieId,
      ],
      queryFn: getRecommendation,
    },
  ]);

  if (
    reqDetails[0].isLoading ||
    reqDetails[1].isLoading ||
    reqDetails[2].isLoading ||
    reqDetails[3].isLoading
  ) {
    return (
      <div className="home-spinner">
        <FontAwesomeIcon icon={faSpinner} className="loading-spinner" />
      </div>
    );
  }

  const details = reqDetails[0].data;
  const scorePercentage = Math.floor(parseFloat(details.vote_average * 10));

  const cast = reqDetails[1].data.cast;
  const similar = reqDetails[2].data.results;
  const recommendation = reqDetails[3].data.results;

  const handleMovieCardClicked = (type, id, background) => {
    navigate(`/${type}/${id}`, { replace: true });
    document.documentElement.style.setProperty(
      "--bg-img",
      `url("https://image.tmdb.org/t/p/original${background}")`
    );
  };

  return (
    <>
      <NavBar />
      <div className="details-background-img">
        <div className="details-container">
          <div
            className="details-poster"
            style={{
              width: "200px",
              height: "300px",
              backgroundImage: `url("https://image.tmdb.org/t/p/original${details.poster_path}")`,
              backgroundSize: "cover",
            }}
          ></div>
          <h2>{type === "movies" ? details.original_title : details.name}</h2>
          <ul className="details-genres">
            {details.genres.map((genre, index) => (
              <li key={index} className="genre">
                {genre.name}
              </li>
            ))}
          </ul>
          <div className="user-score-container">
            <div
              className="details-user-score"
              style={{
                background: `conic-gradient(${
                  scorePercentage < 70
                    ? "#FFD966"
                    : scorePercentage < 50
                    ? "#B73E3E"
                    : "#0e8388"
                } ${scorePercentage * 3.6}deg, #aaafaf 0deg)`,
              }}
            >
              <span className="user-score-value">{scorePercentage}%</span>
            </div>
            <div className="give-rate">
              <FontAwesomeIcon icon={faStar} className="rate-star-icon" />
            </div>
          </div>
          <div className="details-overview">{details.overview}</div>
        </div>
      </div>
      {/* Cast */}
      <div className="more-container cast">
        <div className="more-header cast">
          <h2>Cast</h2>
          {cast.length > 6 && <Link>View More</Link>}
        </div>
        <div className="more-card-container cast">
          {reqDetails[1].isSuccess ? (
            cast.slice(0, 6).map((actor) => (
              <div className="more-card cast" key={actor.id}>
                <div
                  className="more-profile-img cast"
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${actor.profile_path}")`,
                  }}
                />
                <h3 className="more-name cast">{actor.name}</h3>
                <p className="more-role cast">{actor.character}</p>
              </div>
            ))
          ) : (
            <div className="trending-loading-container">
              <FontAwesomeIcon
                icon={faSpinner}
                className="loading-spinner"
                style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Recommendation */}
      {recommendation.length > 0 && (
        <div className="more-container recommendation">
          <div className="more-header recommendation">
            <h2>Recommended</h2>
            {recommendation.length > 6 && <Link>View More</Link>}
          </div>
          <div className="more-card-container recommendation">
            {reqDetails[2].isSuccess ? (
              recommendation.slice(0, 6).map((movie) => (
                <div
                  className="more-card recommendation"
                  key={movie.id}
                  onClick={(e) => {
                    handleMovieCardClicked(
                      type === "movies" ? "movies" : "tv-shows",
                      e.target.id,
                      movie.backdrop_path
                    );
                  }}
                >
                  <div
                    className="more-profile-img recommendation"
                    id={movie.id}
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`,
                    }}
                  >
                    <div
                      className="details-user-score more"
                      style={{
                        background: `conic-gradient(${
                          Math.floor(parseFloat(movie.vote_average)) * 10 < 70
                            ? "#FFD966"
                            : Math.floor(parseFloat(movie.vote_average)) * 10 <
                              50
                            ? "#B73E3E"
                            : "#0e8388"
                        } ${
                          Math.floor(parseFloat(movie.vote_average)) * 10 * 3.6
                        }deg, #aaafaf 0deg)`,
                      }}
                    >
                      <span className="user-score-value more">
                        {Math.floor(parseFloat(movie.vote_average)) * 10}%
                      </span>
                    </div>
                  </div>
                  <h3 className="more-name recommendation">
                    {type === "movies" ? movie.title : movie.name}
                  </h3>
                </div>
              ))
            ) : (
              <div className="trending-loading-container">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="loading-spinner"
                  style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Similar */}
      {similar.length > 0 && (
        <div className="more-container similar">
          <div className="more-header similar">
            <h2>Similar</h2>
            {similar.length > 6 && <Link>View More</Link>}
          </div>
          <div className="more-card-container similar">
            {reqDetails[2].isSuccess ? (
              similar.slice(0, 9).map((movie) => (
                <div
                  className="more-card similar"
                  key={movie.id}
                  onClick={(e) => {
                    handleMovieCardClicked(
                      type === "movies" ? "movies" : "tv-shows",
                      e.target.id,
                      movie.backdrop_path
                    );
                  }}
                >
                  <div
                    id={movie.id}
                    className="more-profile-img similar"
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                    }}
                  >
                    <div
                      className="details-user-score more"
                      style={{
                        background: `conic-gradient(${
                          Math.floor(parseFloat(movie.vote_average)) * 10 < 70
                            ? "#FFD966"
                            : Math.floor(parseFloat(movie.vote_average)) * 10 <
                              50
                            ? "#B73E3E"
                            : "#0e8388"
                        } ${
                          Math.floor(parseFloat(movie.vote_average)) * 10 * 3.6
                        }deg, #aaafaf 0deg)`,
                      }}
                    >
                      <span className="user-score-value more">
                        {Math.floor(parseFloat(movie.vote_average)) * 10}%
                      </span>
                    </div>
                  </div>
                  <h3 className="more-name similar">
                    {type === "movies" ? movie.title : movie.name}
                  </h3>
                </div>
              ))
            ) : (
              <div className="trending-loading-container">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="loading-spinner"
                  style={{ fontSize: "32px", color: "#2C3333", opacity: "0.7" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
