const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "react-crud"
});
//These are some elements that are necessary for the communication with the Front
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors())
app.use(express.json())

//This is the part that sends the elements from the database to the front end.

app.get("/api/get",(req,res)=>{
    const sqlInsert = "SELECT * FROM movies;"
    db.query(sqlInsert,(err,result)=>{
        
        res.send(result)
    });
})

//This is the par of the API that will add new elements to the database.
app.post("/api/insert",(req,res)=>{

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movies (movieName,movieReview) VALUES (?,?);"
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        console.log(err)
    });
})

//This is meant to delete the entry
app.delete('/api/delete/:movieName',(req,res)=>{
    const name = req.params.movieName;
    const sqlDel = "DELETE FROM movies WHERE movieName = ?";

    db.query(sqlDel,name, (err,result)=>{
        if(err) console.log(err);
    });
})

//This is the update button
app.put('/api/update',(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movies SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate,[review,name], (err,result)=>{
        if(err) console.log(err);
    });
})

app.listen(3001, ()=>{
    console.log("Running on port 3001")
})