var mongoose = require("mongoose");


var PageSchema = new mongoose.Schema({
    page_author: String,
    page_author_image: String,
    page_title: String,
    page_category: String,
    tags: [],
    page_date: String,
    isParental: Boolean,
    page_parent: String,
    page_url: String,
    page_menu_link: String,

    page_sections: [
        {
        section_title: String,
        section_content: String
        }
   ],
});



module.exports = mongoose.model("Page", PageSchema);