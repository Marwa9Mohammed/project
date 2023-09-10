import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies } from "../../utils/api"; // Import your API function
import MovieCard from "../../components/MovieCard";

function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTopRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderMovies = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (movies.length === 0) {
      return <p>No movies found.</p>;
    }

    return (
      <div className="row card-deck">
        {movies.map((movie) => (
          <div className="col-md-6 col-sm-12 col-lg-4 mb-4 " key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  };

  const renderPageNumbers = () => {
    const maxPageNumbers = 10;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
    let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`btn btn-${
          currentPage === pageNumber ? "primary" : "light"
        } mx-1`}
        onClick={() => {
          handlePageChange(pageNumber);
          scrollToTopRef.current.scrollIntoView();
        }}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-white">Popular Movies</h1>
      {renderMovies()}
      <div className="text-center mt-4">
        {renderPageNumbers()}
        <div ref={scrollToTopRef}></div>
      </div>
    </div>
  );
}

export default PopularMoviesPage;
