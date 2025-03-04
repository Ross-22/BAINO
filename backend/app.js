const express = require('express');
const app = express();
const bosyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

app.use(bosyParser.json());
app.use(bosyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://kadmielbaino:kadmiel2203@cluster0.4hxfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to the Database');
    })
    .catch(() => {
        console.log('Connection Failed')
    })



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

    next();
})

    app.post('/api/posts', (req, res, next) => {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });

        post.save();
        res.status(201).json({
            message: 'Post added successfully'
        });
    });

app.get('/api/posts', (req, res, next) => {
    const posts = 
        [{
            id: "fadf12421l",
            title: "First server-side posikyikykiyikyt",
            content: "first from server-side"
        },
        {
            id: "asgdagsas",
            title: "Second server-side post",
            content: "second from server-side"
        },
        ];

    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts    
    });
});

module.exports = app;