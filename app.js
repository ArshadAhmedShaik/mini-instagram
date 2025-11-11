const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const connection = require("./db/connection");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.redirect("index");
});

// route to display all posts

app.get("/index", (req, res) => {
    const q = "SELECT * FROM posts ORDER BY id DESC";
    connection.query(q, (errors, results) => {
        if (errors) return res.send("Error fetching posts");
        let posts = results;
        res.render("index", { posts });
    })
});

// route to add new post form

app.get("/new", (req, res) => {
    res.redirect("/index/new");
});

// route to add new post form

app.get("/index/new", (req, res) => {
    res.render("new");
});

// route to post details for new form

app.post("/index", (req, res) => {
    const { title, caption } = req.body;
    const q = "INSERT INTO posts (title, caption) VALUES (?, ?)";
    connection.query(q, [title, caption], (err) => {
        if (err) return res.send("Error adding post");
        res.redirect("/");
    });
});

// route to display the edit form

app.get("/index/:id/edit", (req, res) => {
        const { id } = req.params;
        const q = "SELECT * FROM posts WHERE id = ?";
        connection.query(q, [id], (err, result) => {
                if(err) return res.send("Error fetching post!");
                res.render("edit", { post: result[0]});
        });
});

// route to put the edited details [ put request ]

app.put("/index/:id", (req, res) => {
  const { id } = req.params;
  const { title, caption } = req.body;
  const q = "UPDATE posts SET title=?, caption=? WHERE id=?";
  connection.query(q, [title, caption, id], (err) => {
    if (err) return res.send("Error updating post!");
    res.redirect("/");
  });
});

// route to delete the post

app.delete("/index/:id", (req, res) => {
    let { id } = req.params;
    let q = "DELETE FROM posts WHERE id = ?";
    connection.query(q, [id], (error, result) => {
          if(error) return res.send("Error Deleting Post!");
          res.redirect("/");
    });
});

// route to like the post 

app.post("/index/:id/like", (req, res) => {
  const { id } = req.params;
  const q = "UPDATE posts SET likes = likes + 1 WHERE id=?";
  connection.query(q, [id], (err) => {
    if (err) return res.send("Error liking post");
    res.redirect("/");
  });
});

app.use((req, res) => {
    res.send("Page Not Found!");
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}!`);
});





