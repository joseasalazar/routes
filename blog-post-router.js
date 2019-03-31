const express = require('express')
const router = express.Router()
const { BlogPosts } = require('./blog-post-model')
const uuid = require('uuid')

router.get('/blog-posts', (req, res, next) => {

    let blogPostsInfo = BlogPosts.get()

    if (blogPostsInfo) {
        res.status(200).json({
            message: "Successfully sent the list of posts",
            status: 200,
            posts: blogPostsInfo
        })
    } else {
        res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        })
        return next()
    }
})

router.get('/blog-posts/:author', (req, res, next) => {
    let blogAuthor = req.params.author;

    if (!blogAuthor) {
        res.status(406).json({
            message: "Missing author in the parameters",
            status: 406
        })
        return next()
    }

    let blogPostsInfo = BlogPosts.getAuthor(blogAuthor)

    if (blogPostsInfo.length == 0) {
        res.status(406).json({
            message: "Author not found in the list",
            status: 406
        })
        return next()
    } else {
        res.status(200).json({
            message: "Successfully sent the blog author",
            status: 200,
            posts: blogPostsInfo
        })
    }
})

router.post('/blog-posts', (req, res, next) => {

    let requireFields = ['title', 'content', 'author', 'publishDate']
    for (let i = 0; i < requireFields.length; i++) {
        let currentField = requireFields[i]

        if (!(currentField in req.body)) {
            res.status(406).json({
                message: `Missing field ${currentField} in body.`,
                status: 406
            })
            return next()
        }
    }

    let newPost = BlogPosts.post(req.body.title, req.body.content, req.body.author, req.body.publishDate);

    res.status(201).json({
        message: "Successfully added the post",
        status: 201,
        post: newPost
    })
})

router.delete('/blog-posts/:id', (req, res, next) => {
    let blogId = req.body.id;
    let blogParamsId = req.params.id;

    if(blogId != blogParamsId || !blogId || !blogParamsId){
        res.status(406).json({
            message: "Missing ID field in parameters, body or they didn't match.",
            status: 406
        });
        return next()
    }

    if (BlogPosts.delete(blogParamsId)) {
        res.status(200).json({
            message: "Successfully deleted post",
            status: 200
        })
    } else {
        res.status(404).json({
            message: "Blog post not found",
            status: 404
        })
        return next()
    }
})

router.put('/blog-posts/:id', (req, res, next) => {
    var blogId = req.params.id

    if(!blogId){
        res.status(406).json({
            message: "Missing id field in params",
            status: 406
        })
        return next()
    }

    if (Object.keys(req.body).length === 0) {
        res.status(404).json({
            message: 'No data in body.',
            status: 404
        })
        return next()
    }

    let updated = BlogPosts.put(req.body, blogId)
    
    if (updated) {
        res.status(200).json({
            message: "Successfully updated post",
            status: 200,
            post: updated
        })
    } else {
        res.status(404).json({
            message: 'No ID found',
            status: 404
        })
        return next()
    }
    
})

module.exports = router
