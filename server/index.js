const express= require('express');
const app=express();
const mysql=require('mysql');
const bodyParser=require('body-parser')
const cors=require('cors');

const db=mysql.createPool({
    host:'localhost',
    user: 'root',
    password : 'root',
    database:'cruddatabase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    
    const movieName=req.body.movieName
    const movieReview=req.body.movieReview
    db.query("SELECT * FROM movie_reviews", [movieName,movieReview],(err , result) =>{
        res.send(result);
    });
})

app.post('/api/insert',(req,res)=>{
    const movieName=req.body.movieName
    const movieReview=req.body.movieReview
    const sqlInsert="insert into movie_reviews(movieName,movieReviews) values (?,?)"
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        res.send(result);
    })
});

app.delete("/api/delete/:movieName",(req,res)=>{
    const name=req.params.movieName;
    const sqlDelete="delete from movie_reviews where movieName = ?";
    db.query(sqlDelete,name,(err,result)=>{
        if (err) console.log(err);
    });

});

app.put("/api/update",(req,res)=>{
    const name=req.body.movieName;
    const review=req.body.movieReview;
    const sqlUpdate="update movie_reviews set movieReviews = ? where movieName=?";
    db.query(sqlUpdate,[review,name],(err,result)=>{
        if (err) console.log(err);
    });
});

app.listen(3001,()=>{
    console.log("server is running on port 3001")
});