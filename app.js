//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "I'm Mousmi Suryawanshi.I am an IT student studying in Walchand College of Engineering,Sangli.From being a novice in this area to developing genuine interest in Competitive programming and Development,I have learnt a lot.The journey I have embarked is filled with hurdles,but afterall,we all are meant to learn and grow amidst of respecting everyone's choices,beliefs and struggles.I ocassionally love dancing,singing,writing and painting.";
const aboutContent = "Writing helps me express my thoughts and I believe that,for me, blogging not only helps me to build self-confidence,but also helps to enlighten a ray of positivity among the readers.This is a blog website developed by me as a part of my Webd learning process.I have always loved writing,so I thought,what else but this would be a great opportunity to build my own blooging website and to learn web development.";
const contactContent = "Find about me and my contact details on this website, also built as my learning process: ";

const app = express();

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{startingContent:homeStartingContent , posts:posts});
  console.log(posts);
});

app.get("/about",function(req,res){
  res.render("about",{about_Content:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
    const post={
      title: req.body.postTitle,
      content: req.body.postBody
    };

    posts.push(post);

    res.redirect("/")
});

app.get("/posts/:postName",function(req,res)
{
  const requestedTitle=_.lowerCase(req.params.postName);


  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);

    if(storedTitle===requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      })
    }
    
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
