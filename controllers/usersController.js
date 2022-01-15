import bcrypt from "bcrypt";
import { User } from "../model/user.js";

export class UsersController {
  static showAllUsers(res) {
    User.find()
    .then((users) =>
      res.render("users/users", { main_title: "Users", users: users })
    )
    .catch((err) => {
        res.status(400).json({ e: err });
      });
  }

  static showUser(res) {
    res.render("users/user", { main_title: user.name, user: {} });
  }

  static addNewUser(res) {
    res.render("users/new", { main_title: "Create your account" });
  }

  static createUser(req, res) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      const user = new User({
          username : req.body["username"],
          email : req.body["email"],
          password : hash
      });
      user.save().then(() => res.redirect("users"))
    });
    
  }
}
