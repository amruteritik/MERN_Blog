import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Post from "./PostSchema.js";
import Pusher from "pusher";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import 'express-async-errors';



const app = express();

dotenv.config();
const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname+"./uploads"));

mongoose.set("strictQuery", true);

const pusher = new Pusher({
  appId: "1579545",
  key: "f61e5bdfe988c057ac01",
  secret: "5d7e10c1798c0300617a",
  cluster: "ap2",
  useTLS: true
});


//declaring routers
// console.log(DATABASE);
const connectionUrl = process.env.DATABASE

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const PostCollection = db.collection("posts");
  const changeStream = PostCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const PostDetails = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        title: PostDetails.title,
        content: PostDetails.content,
        image: PostDetails.image,
        time: PostDetails.time,
      });
    }
  });
});



//declaring route
app.get("/", async (req, res) => {
  const data = await Post.find().sort({ _id: -1 });
  return res.status(200).send({ data });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Post.findById(id);

  if (!data) {
    return res.status(404).send({ message: "Post not found" });
  }
  return res.status(200).send({ data });
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const data = await Post.findOneAndDelete({ _id: id });

  if (data.rowCount === 0) {
    return res
      .status(404)
      .send({ message: "No Data Found To Delete With That Id" });
  }
  return res.status(200).send({ data });
});

app.post("/" , async (req, res) => {
  const body = req.body;
  console.log(body);

  Post.create(body).then(() => {
    res.redirect("/");
})
});

//connecting to mongoDb

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
