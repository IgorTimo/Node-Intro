import express from "express";
import { check, body } from "express-validator";
import { User } from "../model/user.js";
import { CommentsController } from "../controllers/commentsController.js";
import { SessionsController } from "../controllers/sessionsController.js";
import { StaticPagesController } from "../controllers/staticPagesController.js";
import { UsersController } from "../controllers/usersController.js";
import { requireAuth, tryAuth, requireNoAuth } from "../config/auth.js";

export const router = express.Router();

router.get("/", tryAuth, (_req, res) => {
  StaticPagesController.index(res);
});

router.get("/about", tryAuth, (_req, res) => {
  StaticPagesController.about(res);
});

router.get("/comments", tryAuth, (_req, res) => {
  CommentsController.showAllComments(res);
});

router.get("/comment/:commentId/:commetTitle", requireAuth, (req, res) => {
  CommentsController.showComment(req, res);
});

router.put("/comment/:commentId", requireAuth, (req, res) => {
  CommentsController.updateComment(req, res);
});

router.delete("/comments/:commentId", requireAuth, (req, res) => {
  CommentsController.deleteComment(req, res);
});

router.post("/comments", requireAuth, (req, res) => {
  CommentsController.addComment(req, res);
});

router.get("/users", tryAuth, (req, res) => {
  UsersController.showAllUsers(req, res);
});

router.get("/user/:userId/:userName", tryAuth, (req, res) => {
  UsersController.showUser(req, res);
});

router.get("/sessions/new", requireNoAuth, (req, res) => {
  SessionsController.createNewSession(req, res);
});

router.post("/sessions", requireNoAuth, (req, res) => {
  SessionsController.createSession(req, res);
});

router.delete("/sessions", requireAuth, (req, res) => {
  SessionsController.deleteSession(req, res);
});

router.get("/users/new", tryAuth, (req, res) => {
  UsersController.addNewUser(req,res);
});

router.post(
  "/users",
  tryAuth,
  check("email").isEmail().withMessage("Email is invalid"),
  body("username").custom(value => {
    return User.findOne({username: value}).then(user => {
      if(user){
        return Promise.reject("Username are not avalible")
      }
    })
  }),
  (req, res) => {
    UsersController.createUser(req, res);
  }
);
