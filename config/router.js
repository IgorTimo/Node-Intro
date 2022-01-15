import express from "express";
import { CommentsController } from "../controllers/commentsController.js";
import { StaticPagesController} from "../controllers/staticPagesController.js"

export const router = express.Router();

router.get("/", (_req, res) => {
    StaticPagesController.index(res);
});

router.get("/about", (_req, res) => {
    StaticPagesController.about(res);
  });

router.get("/comments", (_req, res) => {
    CommentsController.showAllComments(res);
});

router.get("/comment/:commentId/:commetTitle", (req, res) => {
    CommentsController.showOneComment(req, res);
});

router.put("/comment/:commentId", (req, res) => {
    CommentsController.updateComment(req, res);
});

router.delete("/comments/:commentId", (req, res) => {
    CommentsController.deleteComment(req, res);
});

router.post("/comments", (req, res) => {
    CommentsController.addComment(req, res);
});



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

router.get("/users", (req, res) => {
  res.render("users", { main_title: "Users", users: users });
});

router.get("/users/:user_id", (req, res) => {
  const user = users.find(
    (user) => user["id"] === parseInt(req.params["user_id"])
  );
  res.render("user", { main_title: user.name, user: user });
});


