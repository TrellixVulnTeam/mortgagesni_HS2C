//Core Node Modules 
const express = require("express");
const app = express();

//Third Party modules
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash"); 


//Building Global Object to be served to all pages 
const Posts = require("./models/posts");
const Pages = require("./models/pages");

var globalObj = {
  content: {
    allPosts: {},
    allPages: {},
  }
};

globalObj.content.allPages = findPosts();

function findPosts(){
    Pages.find({}, function(err, foundPages){
        if(err){
            console.log(err)
        }else{
         
            return foundPages;
        }
    })
}

console.log("Here")
console.log(globalObj)



//Passport
var passport = require('passport')
  , LocalStrategy = require('passport-local');


//Schema's 
const User = require("./models/user")


//Coonnect to Atlas Database
const databaseConnect = "mongodb+srv://ricky1001:DogsDick@mindmymortgage.dri24.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" //'mongodb+srv://ricky1001:Astron!23@cluster0.eazmp.mongodb.net/Cluster0?retryWrites=true&w=majority';
//App Configuration
mongoose.connect(databaseConnect, {useNewUrlParser: true});

//Settings 
app.set('view engine', 'ejs');
app.set('views', 'views');



//Routes
const HomeRoute = require("./routes/main/home");
const exampleRoutes = require("./routes/example");
const authRoutes = require("./routes/authorization/auth");
const dashboardRoutes = require("./routes/dashboards/dashboard");
const logInOutRoutes = require("./routes/authorization/log-in-out");
const postRoutes = require("./routes/posts/posts");
const pageRoutes = require("./routes/pages/pages");
const calcRoutes = require("./routes/calculators/calculators");
// const sourcingRoutes = require("./routes/sourcing/sourcing");
// const lifeSourcingRoutes = require("./routes/sourcing/lifeSourcing");


//App Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));




//Passport
app.use(session({
  secret: 'Surf at lissy motherfucker',
  resave: false,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Using Routes
app.use(exampleRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(logInOutRoutes);
app.use(postRoutes);
app.use(HomeRoute);
app.use(pageRoutes);
app.use(calcRoutes);
// app.use(sourcingRoutes);
// app.use(lifeSourcingRoutes);

console.log("request made")

//Server
const PORT = process.env.databaseConnect || 5000;
  app.listen(PORT, () => {
    console.log('listening on 5000')
});

