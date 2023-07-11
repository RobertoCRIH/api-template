
import { useEffect } from 'react';
import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName,setMovieName] = useState("");
  const [review,setReview] = useState("");

  const [movieList,setMovieList] = useState([]);
  // This is to insert into the table
  const SubmitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName: movieName, 
      movieReview: review
    }).then(()=>{
      alert("Success For Insert")
    })
  }
  // This is to get data from the table
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
    })
  },[])

  return (
    <div className="App">
      
      <h1>
        CRUD APPLIACTION
      </h1>

      <div className='form'>

        <label>Movie Name</label>
        <input type='text' name='movieName' onChange={(e)=>{
          setMovieName(e.target.value)
        }}/>

        <label>Review</label>
        <input type='text' name='review' onChange={(e)=>{
          setReview(e.target.value)
        }}/>

        <button onClick={SubmitReview}>Submit</button>

        {movieList.map((val)=>{
          return <h1>Movie Name: {val.movieName}  |  Movie Review: {val.movieReview}</h1>
        })}
      </div>
    </div>
  );
}

export default App;
