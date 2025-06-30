import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';
const Player = () => {
  const { id } = useParams();
  const nevigate = useNavigate();
  const [apiData, setApiData] = useState({
    name:'',
    type:'',
    key:'',
    published_at:'',
  })
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjJmYjY5NmM3MzA1OGJiY2ExMmRjZGYwZjUzMTNjMyIsIm5iZiI6MTc1MTE2NjUxOS40MTIsInN1YiI6IjY4NjBhZTM3ZDI3NmZkZmYzZDRkMWFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fGa9DrieJGPREB3T7PziyPc2YRUAwm3BndiT5RO3hyE'
  }
};

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={() => {nevigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
      <p>{apiData.published_at.slice(0,10)}</p>
      <p>{apiData.name}</p>
      <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
