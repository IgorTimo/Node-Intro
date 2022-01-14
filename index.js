import express from "express";
import hbs from "hbs";
import path from "path";
import mongoose from "mongoose";

const __dirname = path.resolve();
const app = express();
const users = [
  { id: 1, name: "Ivan", surname: "Petrov", desc: "Somethig abou ivan" },
  {
    id: 2,
    name: "Bill",
    surname: "Gates",
    desc: "Founder of Microsoft",
    age: 65,
  },
];

app.use(express.urlencoded({ extended: true }));
await mongoose.connect("mongodb://localhost/mcs");

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  title: String,
  body: String,
  date: Date,
});
const Comment = mongoose.model("Comment", CommentSchema);

app.get("/", (req, res) => {
  res.render("index", { main_title: "Node Express server" });
});

app.get("/comments", (req, res) => {
    Comment.find().then((comments) => {
        res.render("comments/index", { main_title: "Comments", comments: comments });
    }).catch(err => {
        es.status(400).json({ e: err });
    })
  
});

app.post("/comments", (req, res) => {
  const comment = new Comment({
    title: req.body["comment_title"],
    body: req.body["comment_body"],
    date: new Date(),
  });
  comment
    .save()
    .then(() => {
      res.redirect("/comments");
    })
    .catch((e) => {
      res.status(400).json({ e: e });
    });
});

app.get("/about", (req, res) => {
  res.render("about", { main_title: "About us" });
});

app.get("/users", (req, res) => {
  res.render("users", { main_title: "Users", users: users });
});

app.get("/users/:user_id", (req, res) => {
  const user = users.find(
    (user) => user["id"] === parseInt(req.params["user_id"])
  );
  res.render("user", { main_title: user.name, user: user });
});

app.listen(3000, () => {
  console.log("Express web app on http://localhost:3000/");
});

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));
