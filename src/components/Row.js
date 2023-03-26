import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import './Row.css'
import MovieModal from './MovieModal'

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState([])

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)
    console.log("movieSelected", movieSelected)
    console.log("movieSelected", {...movieSelected})
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80
            }}
          >{'<'}</span>
        </div>

        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
            />
          ))}
        </div>

        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80
            }}
          >{'>'}</span>
        </div>
      </div>

{ modalOpen}
      {
        modalOpen && (
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen}
          />
        )
      }
      
    </section>
  );
}

export default Row