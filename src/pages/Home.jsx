import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const moviesBaseURL = "https://api.themoviedb.org/3/"
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const genreId = searchParams.get("genre")

    useEffect(() => {
        setLoading(true)
        let url = ""
        if (genreId) {
            url = `${moviesBaseURL}discover/movie?${apiKey}&with_genres=${genreId}&language=pt-BR`
        } else {
            url = `${moviesBaseURL}movie/top_rated?${apiKey}&language=pt-BR`
        }

        const getMovies = async () => {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results || [])
            setLoading(false)
        }
        getMovies()
    }, [genreId])

    return (
        <div className="container">
            <h2 className="title">
              {genreId ? "Filmes por categoria:" : "Melhores filmes:"}
            </h2>
            <div className="movies-container">
                {loading && <p>Carregando...</p>}
                {!loading && movies.length === 0 && <p>Nenhum filme encontrado.</p>}
                {!loading && movies.length > 0 && 
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)} 
            </div>
        </div>
    )
}

export default Home