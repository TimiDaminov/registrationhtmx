import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = 7000;

app.listen(port, async () => {
  console.log(`app started on port ${port} `);
});

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@registrationhtmx.vwihivf.mongodb.net/?retryWrites=true&w=majority&appName=registrationhtmx`
);

const start = async () => {
  try {
    await client.connect();
    console.log("Connection set!");
    // await client.db().collection("user").deleteMany({});
    await client.db().collection("user");
  } catch (e) {
    console.log(e);
  }
};

app.post("/signup", async (req, res) => {
  console.log(req.body);
  await client.db().collection("user").insertOne({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.send(
    `Account created successfully! Welcome <strong>${req.body.username}</strong> !`
  );
});

app.post("/signin", async (req, res) => {
  setTimeout(async () => {
    const user = await client
      .db()
      .collection("user")
      .findOne({ username: req.body.username, password: req.body.password });

    if (!user) {
      res.send("User does not exist!");
    } else if (user) {
      res.send(`Welcome back! ${user.username}`);
    }
  }, 2000);
});

start();
