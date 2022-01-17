import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import cookieSession from 'cookie-session';
import { router } from "./config/router.js";
import setupHbs from "./config/hbs.js";

await mongoose.connect("mongodb://localhost/mcs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ["test"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use("/", router);

app.listen(3000, () => {
  console.log("Express web app on http://localhost:3000/");
});


setupHbs(app);


