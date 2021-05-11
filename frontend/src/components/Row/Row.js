import { useState, useEffect} from 'react';
import './Row.css';
import axios from 'axios';
import Youtube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({isLargeRow, title, fetchUrl}) {

    const [movies, setmovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:5000' + fetchUrl);
            // console.log(response);
            setmovies(response.data)
            return response;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    // console.log(movies);

    const handleClick = async(movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            const name = movie?.name || movie?.original_name || movie?.title || "";
            const response = await axios.get('http://localhost:5000/trailer/' + name);
            // console.log(response);
            setTrailerUrl(response.data[0].id.videoId);
            return response;
        }
    };

    return (
        <div className="row"> 
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => {
                    var hasImage = false;
                    if(isLargeRow){
                        if(movie.poster_path){
                            hasImage = true;
                        }
                    }else{
                        if(movie.backdrop_path){
                            hasImage = true;
                        }
                    }
                    if(hasImage){
                        return <img 
                        onClick = {() => handleClick(movie)}
                        key={movie.id} 
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`} 
                        src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name }></img>
                    }else{
                        return null;
                    }
                })}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;