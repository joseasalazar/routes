const uuid = require('uuid')

const blogPosts = [{
    id: uuid.v4(),
    title: "First Blog's Post",
    content: "Hello, this is the first post of my blog",
    author: "JoseAndresSalazar",
    publishDate: "2014-10-13"
},
{
    id: uuid.v4(),
    title: "Second Blog's Post",
    content: "Hello, this is the second post of my blog",
    author: "JoseAndresSalazar",
    publishDate: "2019-03-24"
},
{
    id: uuid.v4(),
    title: "Third Blog's Post",
    content: "Hello, this is the third post of my blog",
    author: "JoseAndres",
    publishDate: "2018-03-14"
}]

const BlogPosts = {
    get: function() {
        return blogPosts
    },

    getAuthor: function(author) {
        let posts = []
        blogPosts.forEach(post => {
            if (post.author == author) {
                posts.push(post)
            }
        })

        return posts
    },

    post: function(newTitle, newContent, newAuthor, newPublishDate) {
        let objectToAdd = {
            id: uuid.v4(),
            title: newTitle,
            content: newContent,
            author: newAuthor,
            publishDate: newPublishDate
        }
        blogPosts.push(objectToAdd)
        return post
    },

    delete: function(id) {
        let deleted = false
        blogPosts.forEach((item, index) => {
            if (item.id === id) {
                blogPosts.splice(index, 1)
                deleted = true
            }
        })

        return deleted
    },

    put: function(body, id) {
        var objectToUpdate
        objectToUpdate = blogPosts.find(item => {
            return item.id == id
        })

        if (objectToUpdate) {
            var foundIndex = blogPosts.findIndex(item => item.id == objectToUpdate.id)
            if (body.title) {
                blogPosts[foundIndex].title = body.title
            }
            if (body.content) {
                blogPosts[foundIndex].content = body.content
            }
            if (body.author) {
                blogPosts[foundIndex].author = body.author
            }
            if (body.publishDate) {
                blogPosts[foundIndex].publishDate = body.publishDate
            }
            return blogPosts[foundIndex]
        } else {
            return false
        }
    }
}

module.exports = {BlogPosts}