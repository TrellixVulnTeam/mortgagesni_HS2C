var mongoose = require("mongoose");


var PostSchema = new mongoose.Schema({
    post_date: String,
    post_author: String,
    post_author_image: String,
    post_content: String,
    post_title: String,
    post_category: String,
    post_news: Boolean,
    post_advice: Boolean,
    tags: [],
    post_url: String,   
});



module.exports = mongoose.model("Post", PostSchema);