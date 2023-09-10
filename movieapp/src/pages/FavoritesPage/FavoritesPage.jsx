// pages/FavoritesPage.js
import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-white">Favorite Movies</h1>
      <div className="row card-deck">
        {favorites.map((movie) => (
          <div className="col-md-6 col-sm-12 col-lg-4 mb-4 " key={movie.id}>
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
