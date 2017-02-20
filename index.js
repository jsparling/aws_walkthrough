'use strict'

var bookshelf = require('./bookshelf')
var Article = require("./models/article")

var getInsertedArticle = (id) =>{
  console.log("\nnow get the article from the db\n")
  Article.where('id', id).fetch().then(function(article) {
    console.log(article)

    //destroy the database connection
    bookshelf.knex.destroy()
  })
}

var insertArticle = (callback) =>{
  // create a new entry in articles database
  new Article({
    title: "Sample title",
    body: "Sample body"
  }).save()
  .then(function(saved) {
    console.log(saved)
    var insertedId = saved.attributes.id

    callback(insertedId)

    //destroy the database connection
    // bookshelf.knex.destroy()
  })
}

// insert the article, and when we are done, get the inserted article
// insertArticle(function(id){ console.log("inserted article with id: " + id) })

insertArticle(getInsertedArticle)
