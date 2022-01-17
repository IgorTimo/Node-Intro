import { User } from "../model/user.js";

export function requireAuth(req, res, next) {
  auth(req, res, next);
}

export function tryAuth(req, res, next) {
  auth(req, res, next, false);
}

export function requireNoAuth(req, res, next) {
  if (req.session.user && req.session.user._id){
    res.redirect("/");
  }
  next();
}

function auth(req, res, next, mandatory = true) {
  if (req.session.user && req.session.user._id) {
    User.findOne({ _id: req.session.user._id })
      .then((user) => {
        // console.log("User in session = " + JSON.stringify(user));
        res.locals.currentUser = user;
        next();
      })
      .catch((e) => {
        res.redirect("/sessions/new");
      });
  } else {
    if (mandatory) {
      res.redirect("/sessions/new");
    }
    // console.log("Nobody in this session.")
    next();
  }
}
