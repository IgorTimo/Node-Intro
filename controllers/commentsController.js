import { Comment } from "../model/comment.js";


export class CommentsController {
  
  static showAllComments(res) {
    Comment.find()
      .then((comments) => {
        res.render("comments/index", {
          main_title: "Comments",
          comments: comments,
        });
      })
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }


  static showOneComment(req, res){
    Comment.findOne({ _id: req.params.commentId })
    .then((comment) => {
      res.render("comments/show", {
        main_title: comment.title,
        comment: comment,
      });
    })
    .catch((err) => {
      es.status(400).json({ e: err });
    });
  }

  static updateComment(req, res){
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
        es.status(400).json({ e: err });
      });
  }

  static deleteComment(req, res){
    Comment.deleteOne({ _id: req.params.commentId })
    .then(() => {
      res.redirect("/comments");
    })
    .catch((err) => {
      es.status(400).json({ e: err });
    });
  }

  static addComment(req, res){
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
  }
}
