export class StaticPagesController {

  static index(res) {
    res.render("static_pages/index", { main_title: "Node Express server", user: res.locals.currentUser ? res.locals.currentUser.username : "Log in" });
  }
  
  static about(res) {
    res.render("static_pages/about", { main_title: "About us" });
  }
}
