import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Nav.css'

function Nav() {
  const [show, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
    return () => {
      window.removeEventListener("scroll", () => {})
    }
  }, [])

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
      />
      <img
        alt="User logged"
        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYSw2XUJOe-RXGqlMhzAK2kb3m8jiiuICaICOYRemQXvfBcEmoaG0XMebWDsKrQ4fhsAYwzopxK6Cm5l5w2F9iMzCVqZuapW7A.png?r=201"
        className="nav__avatar"
      />
    </nav>
  )
}

export default Nav
