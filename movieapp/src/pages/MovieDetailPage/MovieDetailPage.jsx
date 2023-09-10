
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetailPage = () => {
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  async function fetchData() {
    if (id !== '') {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c`)
        .then((response) => {
          setMovie(response.data);
        });
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c`)
        .then((response) => {
          setCast(response.data.cast);
        });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [prefix, suffix] = id.split('-');

  return (
    <div>
      {movie && Object.keys(movie).length > 0 && (
        <div className="card bg-dark mb-4">
          <div className="d-flex">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="card-img-top"
              style={{ height: 'auto', maxWidth: '30%' }}
            />

            <div className="card-body" style={{ flex: 1, marginLeft: '1rem' }}>
              <h5 className="card-title text" style={{textShadow:'5px 5px 4px rgba(0, 0, 0, 0.7) ' ,fontSize:40, fontFamily:'Serif',color:'#FFAA1D'}}>{movie.title}</h5>
              <p className="card-text text-secondary"style={{textShadow:'5px 5px 4px rgba(0, 0, 0, 0.5)',fontSize:17, fontFamily:'Helvetica', marginTop:50, }}>{movie.overview}</p>
              <p className="card-text text-secondary"style={{textShadow:'5px 5px 4px rgba(0, 0, 0, 0.5)',fontSize:17, fontFamily:'Helvetica'}}>Release Date: {movie.release_date}</p>
              <p className="card-text text-secondary"style={{textShadow:'5px 5px 4px rgba(0, 0, 0, 0.5)',fontSize:17, fontFamily:'Helvetica'}}>Rating: {movie.vote_average}/10</p>
              <div>
                <h6 className="text-white">Cast</h6>
                <div className="d-flex">
                  {cast.map((actor) => (
                    <div key={actor.id} className="text-secondary mr-3">
                      {actor.profile_path && (
                        <div
                          className="actor-img-circle"
                          style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            marginBottom: '0.5rem'
                          }}
                        ></div>
                      )}
                      <p>{actor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;

