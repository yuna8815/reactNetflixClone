import React, { useState, useEffect } from 'react'
import instance from '../api/axios';
import requests from '../api/requests'
import "./Banner.css"

export default function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기
    const request = await instance.get(requests.fetchNowPlaying)
    // console.log(request)
    // 여러 영화 중 하나의 영화 Id를 랜덤으로 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보 포함)
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_reponse: "videos" }
    })
    console.log(movieDetail)
    setMovie(movieDetail);
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.sustring(0, n - 1) + '...' : str
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover"
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{ movie.title | movie.name || movie.original_name }</h1>

        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button info">
            <span className="space"></span>More Information</button>
        </div>

        <h1 className="banner__description">{ truncate(movie.overview, 100) }</h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  )
}
