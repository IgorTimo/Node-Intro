import express from "express";
import { CommentsController } from "../controllers/commentsController.js";
import { StaticPagesController } from "../controllers/staticPagesController.js";
import { UsersController } from "../controllers/usersController.js";

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
  CommentsController.showComment(req, res);
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

router.get("/users", (req, res) => {
  UsersController.showAllUsers(res);
});

router.get("/user/:user_id", (req, res) => {
  UsersController.showUser(res);
});

router.get("/users/new", (req, res) => {
  UsersController.addNewUser(res);
});

router.post("/users", (req, res) => {
  UsersController.createUser(req, res);
});
