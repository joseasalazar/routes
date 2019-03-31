const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blogRouter = require('./blog-post-router')

const jsonParser = bodyParser.json()

app.use('/posts/api', jsonParser, blogRouter)

app.listen(8080, () => {
    console.log()
});