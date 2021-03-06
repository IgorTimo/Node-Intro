import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { User } from "../model/user.js";
import { ApplicationController } from "./applicationController.js";

export class UsersController extends ApplicationController {
  static showAllUsers(req, res) {
    User.find()
      .then((users) =>
        this.renderView(req, res, "users/users", {
          main_title: "Users",
          users: users,
        })
      )
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }

  static showUser(req, res) {
    User.findOne({ _id: req.params.userId }).then((user) => {
      this.renderView(req, res, "users/user", {
        main_title: user.username,
        name: user.username,
        email: user.email,
        password: user.password,
      });
    });
  }

  static addNewUser(req, res) {
    this.renderView(req, res, "users/new", {
      main_title: "Create your account",
    });
  }

  static createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return this.renderView(req, res, "users/new", {
        main_title: "Create your account",
        errors: errors.array()
      });
    }

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      const user = new User({
        username: req.body["username"],
        email: req.body["email"],
        password: hash,
      });
      user
        .save()
        .then(() => res.redirect("users"))
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    });
  }
}
