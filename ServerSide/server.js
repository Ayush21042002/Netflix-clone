require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const API_KEY = process.env.API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
app.use(cors());

const youtubeRequest = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: YOUTUBE_API_KEY,
  },
  headers: {}
});


app.get('/trailer/:name',async(req,res) => {
    const name = req.params.name;
    try{
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                q: name + " trailer",
                part: "snippet",
                maxResults: 5,
                key: YOUTUBE_API_KEY,
                type: 'video',
            }
        });
        // console.log(response.data.items);
        res.send(response.data.items);
    } catch(error) {
        throw error;
    }
});

app.get('/trending', async(req,res) => {
    var url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/originals', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});


app.get('/toprated', async(req,res) => {
    var url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/action', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/comedy', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/horror', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/romance', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

app.get('/documentaries', async(req,res) => {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`;
    try{
        const response = await axios.get(url);
        // console.log(response.data.results);
        res.send(response.data.results);
    } catch(error) {
        throw error;
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));