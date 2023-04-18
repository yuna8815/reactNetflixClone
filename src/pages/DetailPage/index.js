import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import instance from '../../api/axios'

export default function DetailPage() {
  const { movieId } = useParams()
  // console.log("useParams", movieId)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(
        `/movie/${movieId}`
      )
      // console.log(request)
      setMovie(request.data);
    }
    fetchData();
  }, [movieId])

  if(!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}
