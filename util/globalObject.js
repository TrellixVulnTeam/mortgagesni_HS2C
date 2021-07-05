const Posts = require("../models/posts");
const Pages = require("../models/pages");

const globalObj = {};

findPosts();

function findPosts(){
    Posts.find({}, function(err, foundPosts){
        if(err){
            console.log(err)
        }else{
            globalObj.content.allPosts = foundPosts
        }
    })
}

console.log(globalObj)





