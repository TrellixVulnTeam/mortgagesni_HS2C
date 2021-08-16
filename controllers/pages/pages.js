//Import any required modules
const pages = require("../../models/pages");
const Page = require("../../models/pages");
const Post = require("../../models/posts");

//Source variables 
let key = '89a6a144-2cde-46b0-b396-b1363d883fe1';
var soap = require('soap');

//Get the create new page route
exports.pageGetCreateNew = (req, res, next) => {
    res.render("pages/create-new-page")
}

//Post to the create new page route
exports.pagePostCreateNew = (req, res, next) => {
  console.log(req.body)
  const page_sections = [];

  if(typeof(req.body.section_title) === typeof(page_sections)){
    for(var i = 0; i < req.body.section_title.length; i++){
      let newSection = {
        section_title: req.body.section_title[i],
        section_content: req.body.section_content[i],
        section_style: req.body.style[i]
      }
      console.log("new section below ")
      console.log(newSection)
      page_sections.push(newSection)
    }
    console.log("PAGE SECTIONS ARRAY BELOW")
    console.log(page_sections)
  }else{
    let newSection = {
      section_title: req.body.section_title,
      section_content: req.body.section_content,
      section_style: req.body.style
    }

    page_sections.push(newSection);
  }


    req.body.page_sections = page_sections;
    req.body.page_date = new Date();

    console.log("req.body belwo")
    console.log(typeof req.body.page_sections)

    Page.create(req.body, function(err, newPage){
        if(err){
          console.log(err)
        }else{
          newPage.save();
          res.redirect("/create-new-page");
        }
      })

}




//Show the parentl pages 

let products;
var requestUrl = 'https://stagingapi.twenty7tec.com/sourcing.svc?wsdl';
var args =  {
    licenseKey: '89a6a144-2cde-46b0-b396-b1363d883fe1',
    input: {
      CompanyId: "IMOU85",
      SiteId: "USSCB2",
      Term: "40",
      ExpectedValuation: "200000",
      LoanRequired: "190000",
      ReasonForMortgage: "Purchase",
      MortgageType: "Standard",
      PaymentMethod: "Repayment",
      PostCode: "XI",
      NumberOfItems: 2
    }
};

let requestedPage;

exports.showParentalPages = (req, res, next) => {
  console.log("showing parental ppage")
  const url = req.originalUrl;
  let requestedPage;

  Page.find({}, function(err, foundPages){
    if(err){
      console.log(err)
    }else{
      //Find the requested page using the urls
      foundPages.forEach(function(item){
        //First Check to see if the original url directly matches each items page_url if there is a match that item is the requested page

         if(item.page_url === url){
           requestedPage = item;
           //if there is not match above check to see if the items page_parent + / + page_url directly match the requested url
         }else if(item.parent_page + "/" + item.page_url === url){
           requestedPage = item;
         }
      })
      Post.find({}, function(err, foundPosts){
        if(err){
          console.log(err)
        }else{
          res.render("pages/home",
          {
           url:url, 
           posts: foundPosts, 
           pages: foundPages,
           page: requestedPage
           })
        }
      })
    }
  })
}


         
        
 
    

exports.showPageRoute = (req, res, next) => {
  console.log("Here xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  const url = req.originalUrl;
  console.log(url)
  Page.find({}, function(err, foundPage){
    if(err){
      console.log(err)
    }else{

      let requestedPage;
      foundPage.forEach(function(item){
        const itemUrl = item.page_parent + item.page_url;
        if(itemUrl === url){
          return requestedPage = item;
        }
      })


        
   Post.find({}, function(err, foundPost){
    res.render("pages/show",
     {
      url: url, 
      posts: foundPost, 
      pages: foundPage,
      page: requestedPage
      })
    })
   }
  })
}



