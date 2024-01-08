import { useState } from "react"

export const BuscadorPeliculas = () => {
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'a77b8ef709edf6c0f1f2cba128229e6c'

    const [busqueda, setbusqueda] = useState('')
    const [peliculas, setpeliculas] = useState([])

    const handleInputChange = (e) => {
        setbusqueda(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            if (data.results) {
                setpeliculas(data.results);
            } else {
                setpeliculas([]);
            }
        } catch (error) {
            console.error('Ocurrió un error al buscar películas:', error)
        }
    }
    return (
        <div className="container">
            <h1 className="title">Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ingresa el nombre de la pelicula"
                    value={busqueda}
                    onChange={handleInputChange}

                />
                <button type="submit" className="search-button" >Buscar</button>
            </form>


            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
