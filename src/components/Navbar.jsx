import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'

import './Navbar.css'

const genresURL = "https://api.themoviedb.org/3/genre/movie/list"
const apiKey = import.meta.env.VITE_API_KEY

const Navbar = () => {
  const [search, setSearch] = useState("")
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Buscar gêneros ao montar
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${genresURL}?${apiKey}&language=pt-BR`)
      const data = await res.json()
      setGenres(data.genres || [])
    }
    fetchGenres()
  }, [])

  // Atualiza o select se mudar a URL (ex: voltar para "todas")
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSelectedGenre(params.get("genre") || "")
  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return
    navigate(`/search?q=${search}`)
    setSearch("")
  }

  const handleGenreChange = (e) => {
    const genreId = e.target.value
    setSelectedGenre(genreId)
    if (genreId) {
      navigate(`/?genre=${genreId}`)
    } else {
      navigate(`/`)
    }
  }

  return (
      <nav id='navbar'>
         <h2>
           <Link to="/">
              <BiCameraMovie /> MoviesLib
            </Link>  
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Busque um filme" 
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
            <button type="submit">
              <BiSearchAlt2 />
          </button>
         </form>
         <select value={selectedGenre} onChange={handleGenreChange}>
           <option value="">Todas as categorias</option>
           {genres.map((genre) => (
             <option key={genre.id} value={genre.id}>{genre.name}</option>
           ))}
         </select>
      </nav>
    )
}

export default Navbar