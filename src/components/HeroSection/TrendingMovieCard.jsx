import React from "react";

export default function TrendingMovieCard({ img, getDetails, index }) {
  return (
    <div
      index={index}
      onClick={getDetails}
      className="movie-card"
      style={{ backgroundImage: `url("${img}")` }}
    ></div>
  );
}
