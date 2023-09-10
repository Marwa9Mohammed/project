import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="card bg-dark mb-4">
      <Link className="text-decoration-none" to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top"
          style={{ height: "auto", maxWidth: "100%" }}
        />
      </Link>
      <div className="card-body" style={{ height: "100%" }}>
        <h5 className="card-title text-white">{movie.title}</h5>
        <p
          className="card-text text-secondary text-truncate"
          style={{ maxWidth: "100%" }}
        >
          {movie.overview}
        </p>
        <div className="card-footer d-flex justify-content-end mt-2">
          <FaHeart
            onClick={handleFavoriteClick}
            style={{ width: "30px", height: "30px" }}
            className={`${
              isFavorite
                ? "text-danger !important"
                : "text-secondary !important"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
