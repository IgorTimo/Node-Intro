import bcrypt from "bcrypt";
import { User } from "../model/user.js";


export class SessionsController{
    static createNewSession(req, res){
        res.render('sessions/new', {main_title: "Log in"});
    }

    static createSession(req, res){
        User.findOne({email: req.body.email}).then(user => {
            if(!user){
                res.redirect("sessions/new");
                return;
            }
            bcrypt.compare(req.body.password, user.password).then(valid => {
                if(!valid){
                    res.redirect("sessions/new");
                }else{
                    req.session.user = user;
                    res.redirect("users");
                }
            })
        })

    }

    static deleteSession(req, res){
        if (req.session && req.session.user && req.session.user._id){
            req.session.user = null;
            res.locals.currentUser = null;
        }
        res.redirect("users");
    }
}