'use strict'

var bookshelf = require('./bookshelf')
var Article = require("./models/article")

var getInsertedArticle = (id, callback) =>{
  console.log("\nnow get the article from the db\n")
  Article.where('id', id).fetch().then(function(article) {
    console.log(article)
    callback(article)
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
    // bookshelf.knex.destroy()

    //destroy the database connection
    //
  })
}

// insert the article, and when we are done, get the inserted article
// insertArticle(function(id){ console.log("inserted article with id: " + id) })

insertArticle(function(id) {
  getInsertedArticle(id, function(article) {
    bookshelf.knex.destroy()

    bookshelf = require('./bookshelf')
    insertArticle(function(id) {
      console.log(id);

    })
  })
})
