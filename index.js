const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine','ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

//home route
app.get("/", function(req, res) {
    const  day = date.getDate(); //date module from date.js
    res.render("list", {listTitle:day, newListItems: items});

});

app.post("/", function(req, res){
    // console.log(req.body);
  const item = req.body.newItem;
  
    if(req.body.list === "Work list"){
      workItems.push(item);
      res.redirect ("/work");
    }else{
      items.push(item);
      res.redirect ("/");
    }
  });

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work list", newListItems:workItems});
  });
  
  //POST function for work route
app.post("/work", function(req,res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  });
  
  //GET function for About route
  
app.get("/about", function(req,res){
    res.render("about");
  });

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
  });