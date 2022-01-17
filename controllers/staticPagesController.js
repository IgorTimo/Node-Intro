import { ApplicationController } from "./applicationController.js";


export class StaticPagesController extends ApplicationController{

  static index(res) {
    this.renderView(null, res, "static_pages/index", { main_title: "Node Express server"});
  }
  
  static about(res) {
    this.renderView(null, res, "static_pages/about", { main_title: "About us"});
  }
}
