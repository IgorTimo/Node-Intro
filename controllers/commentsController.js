import { Comment } from "../model/comment.js";
import { ApplicationController } from "./applicationController.js";

export class CommentsController extends ApplicationController {
  static showAllComments(res) {
    Comment.find()
      .populate("user")
      .then((comments) => {
        this.renderView(null, res, "comments/index", {
          main_title: "Comments",
          comments: comments,
        });
      })
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }

  static showComment(req, res) {
    Comment.findOne({ _id: req.params.commentId })
      .populate("user")
      .then((comment) => {
        this.renderView(null, res, "comments/show", {
          main_title: comment.title,
          comment: comment,
        });
      })
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }

  static updateComment(req, res) {
    const comment = new Comment({
      _id: req.params.commentId,
      title: req.body["comment_title"],
      body: req.body["comment_body"],
    });
    Comment.updateOne({ _id: req.params.commentId }, comment)
      .then(() => {
        res.redirect("/comments");
      })
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }

  static deleteComment(req, res) {
    Comment.findOne({ _id: req.params.commentId })
      .then((comment) => {
        if (comment.user.toString() === res.locals.currentUser._id.toString()) {
          comment.delete();
        }
        res.redirect("/comments");
      })
      .catch((err) => {
        // res.status(400).json({ e: err });
        console.log("Error >>>>>>>>>>>" + err);
      });
  }

  static addComment(req, res) {
    const comment = new Comment({
      title: req.body["comment_title"],
      body: req.body["comment_body"],
      date: new Date(),
      user: res.locals.currentUser._id,
    });
    comment
      .save()
      .then(() => {
        res.redirect("/comments");
      })
      .catch((e) => {
        res.status(400).json({ e: e });
      });
  }
}
