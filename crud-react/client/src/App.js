
import { useEffect } from 'react';
import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName,setMovieName] = useState("");
  const [review,setReview] = useState("");

  const [movieList,setMovieList] = useState([]);

  const [newReview,setNewReview] = useState("")
  // This is to insert into the table
  const SubmitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName: movieName, 
      movieReview: review
    });
    //This updates the displayed list of items without having to refresh the page.
    setMovieList([...movieList,
      {movieName: movieName, movieReview: review}])
  }
  // This is to get data from the table
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data);
    })
  },[])

  const deleteReview= (movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);

    window.location.reload();
  }

  const updateReview= (movie)=>{
    Axios.put(`http://localhost:3001/api/update`,{
      movieName: movie,
      movieReview: newReview
    });

    setNewReview("")

    console.log(movieList)
  }

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
          return (
          <div className='card'>
            <h1>
              {val.movieName}
            </h1>
            <p>
              {val.movieReview}
            </p>

            <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>

            <input type='text' id='updateInput' onChange={(e)=>{
              setNewReview(e.target.value);
            }}/>
            <button onClick={()=>{
              updateReview(val.movieName)
            }}>Update</button>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
