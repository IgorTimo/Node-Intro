import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import { router } from "./config/router.js";
import setupHbs from "./config/hbs.js";

await mongoose.connect("mongodb://localhost/mcs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/", router);

app.listen(3000, () => {
  console.log("Express web app on http://localhost:3000/");
});


setupHbs(app);


