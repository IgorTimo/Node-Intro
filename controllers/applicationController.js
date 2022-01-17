export class ApplicationController{
    static renderView(req, res, view, data = {}){
        data.authUser = res.locals.currentUser ? res.locals.currentUser.username : null;
        res.render(view, data);
    }
}