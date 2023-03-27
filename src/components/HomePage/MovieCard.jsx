import React from "react";

export default function MovieCard({ index, handleCardClick, posterPath }) {
  return (
    <div
      className="trending-card"
      index={index}
      onClick={handleCardClick}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${posterPath}")`,
      }}
    ></div>
  );
}
