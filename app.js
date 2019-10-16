//import express body-parser mongoose express-sanitizer method-override and execute express()
var express          = require("express"),
	bodyParser       = require("body-parser"),
	mongoose         = require("mongoose"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride   = require("method-override"),
	app              = express();

//config app- connect mongoose to mongodb
mongoose.connect("mongodb://localhost/book_blog_app",{
	useNewUrlParser: true
});

//tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
//tell express to look for ejs files
app.set("view engine", "ejs");
//tell app to serve custom stylesheets-- .css files which reside in public directory
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//create schema with mongoose
var bookSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
//compile it into a model using mongoose
var Book = mongoose.model("Book", bookSchema);

//create a blog to test and comment it out once you tested it and looked for it in database
//Book.create({
	//title: "Test Blog",
	//image:"https://images.unsplash.com/photo-1509057199576-632a47484ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	//body:"Hello this is a Book blog post!"
//});
//RESTful Routes
//create a root route and redirect it to index route
app.get("/", function(req, res){
	res.redirect("/books");
});
//create the index route
app.get("/books", function(req, res){
	//add funnctionality to index route-retrieve all blogs from the database using .find()-Book.find
	Book.find({}, function(err, books){
		if(err){
			console.log("ERROR!");
		} else{
			res.render("index", {books: books});
		}
	});
	
});
//add a NEW route
app.get("/books/new", function(req,res){
	res.render("new");
});
//add a CREATE Route which is a POST -create a new book post & redirect it somewhere
app.post("/books", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//create book  data from the form
	Book.create(req.body.book, function(err, newBook){
		if(err){
			//if there is an error send the user back to form
			res.render("new");
		} else{
			//redirect to index -- "/books"
			res.redirect("/books");
		}
	})
})
//add SHOW ROUTE
app.get("/books/:id", function(req, res){
	//check if route is working using res.send
	//res.send("SHOW PAGE!!");
	//find the book info and render it using mongoose method .findById() 
	Book.findById(req.params.id, function(err, foundBook){
		//if error is found redirect to index page
		if(err){
			res.redirect("/books");
		} else{
			res.render("show", {book: foundBook});
		}
			
	});
});
//add EDIT ROUTE
app.get("/books/:id/edit", function(req, res){
	//Check if route is working using res.render
	//res.render("edit");
	//find the correct book by :id using findById() method
	Book.findById(req.params.id, function(err, foundBook){
		if(err){
			//if error is found redirect to index page
			res.redirect("/books");
		} else{
			res.render("edit", {book: foundBook});
		}
	});
});
//add UPDATE ROUTE
app.put("/books/:id", function(req, res){
	//check to see if the route works with res.send
	//res.send("UPDATE ROUTE!");
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//use findByIdAndUpdate(id, newdata call back function) method(it takes 3 arguements). req.body.blog-- .blog is the name we gave in our form(<input name="blog[title]> etc) in new.ejs
	Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
		//if error is found redirect to index page
		if(err){
			 res.redirect("/books");
      }  else {
		  //redirect to either show or index, we are doing the show page //add SHOW Route app.get("/blogs/:id"), so for the id we can either use updatedBlog or req.params.id
          res.redirect("/books/" + req.params.id);
      }
	});
});
//add DELETE ROUTE-/books/:id - app.delete
app.delete("/books/:id", function(req, res){
	//check to see if the route is working using res.send
	//res.send("YOU HAVE REACHED THE DESTROY ROUTE!")
	//destroy blog -- //use findByIdAndURemove(id,call back function) method(it takes 2 arguements). and redirect somewhere after delete
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/books");
		} else{
			//redirect somewhere
			res.redirect("/books");
		}
	});	
});

//listen to server
app.listen(3000, function(){
	console.log("Server is running!");
});