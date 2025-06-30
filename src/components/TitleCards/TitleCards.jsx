import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {
    const cardsRef = useRef();
    const [apiData, setApiData] = useState([]);
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjJmYjY5NmM3MzA1OGJiY2ExMmRjZGYwZjUzMTNjMyIsIm5iZiI6MTc1MTE2NjUxOS40MTIsInN1YiI6IjY4NjBhZTM3ZDI3NmZkZmYzZDRkMWFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGa9DrieJGPREB3T7PziyPc2YRUAwm3BndiT5RO3hyE'
    }
    };


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
        
        const scrollElement = cardsRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    return (
        <div className='title-cards'>
        <h2>{title}</h2>
        <div className='card-list'>
            {apiData.map((card,index) => {
                return(
                    <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt='' />
                        <p>{card.original_title}</p>
                    </Link>
                ) 
            })}
        </div>
        </div>
    )
}

export default TitleCards
