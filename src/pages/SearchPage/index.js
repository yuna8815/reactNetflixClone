import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import instance from '../../api/axios'
import { useDebounce } from '../../hooks/useDebounce'
import './SearchPage.css'

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([])

  // console.log("useLocation()", useLocation())
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery();
  const searchTerm = query.get('q')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  // console.log("searchTerm == ", searchTerm)

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      // console.log("request", request)
      setSearchResults(request.data.results)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster">
                  <img
                    src={movieImageUrl}
                    alt="movie image"
                    className="movie__poster"
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-result__text">
          <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    )
  }

  return renderSearchResults()
}
