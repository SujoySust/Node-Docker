const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
  MONGO_USER,  
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require("./config/config");
const app = express();
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Successfully connected to DB."))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

app.enable("trust proxy");
app.use(cors({})); 

app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("<h2> Hi there <h2/>");
  console.log("Yah it ran");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", authRouter);

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`Listening on port ${port}`));
