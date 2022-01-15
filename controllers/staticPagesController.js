export class StaticPagesController {

  static index(res) {
    res.render("index", { main_title: "Node Express server" });
  }
  
  static about(res) {
    res.render("about", { main_title: "About us" });
  }
}
