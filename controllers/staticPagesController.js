export class StaticPagesController {

  static index(res) {
    res.render("static_pages/index", { main_title: "Node Express server" });
  }
  
  static about(res) {
    res.render("static_pages/about", { main_title: "About us" });
  }
}
