const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const redis = require("redis");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const submissionRouter = require("./routes/submission");
const contestRouter = require("./routes/contest");
const convoRouter = require("./routes/convo");
const uploadRouter = require("./routes/upload");
const stripeRouter = require("./routes/stripe");
const notificationRouter = require("./routes/notification");
const personalInfoRouter = require("./routes/personalInfo");
const winnerRouter = require("./routes/winner");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);
const cache = {};
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  next();
});

//users connected in socket
let users = [];

const addUser = (userId, socketId) => {
  userId !== null &&
    users.find((user) => user.userId === userId) === undefined &&
    users.push({ userId, socketId });
};

const getUser = (to) => {
  const user = users.find((user) => user.userId === to);
  return user;
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

/*io.on("connection", (socket) => {
  const socketId = socket.id;
  const token = cookie.parse(socket.handshake.headers.cookie).token;
  if (token) {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    socket.tokenId = verifyToken.id;
    console.log(`connected by ID of ${socket.tokenId}`);
    const userId = socket.tokenId;
    addUser(userId, socketId);
    console.log(`socketId: ${socketId}, userId: ${userId}`);
  }else{
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      removeUser(socketId);
    });
  }
});*/
io.on("connection", (socket) => {
  //on connection
  console.log("a user is connected.");
  //take userId and socketId from user
  socket.on("sendUser", (user) => {
    addUser(user, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("joinChat", (res) => {
    console.log("inside joinChat");
  });

  //send and get notifications
  socket.on("sendNotification", (notification) => {
    const to = notification.to;
    getUser(to) !== undefined && io.to(getUser(to).socketId).emit("getNotification", notification);
  });

  //on disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

if (process.env.NODE_ENV === "development") {
}
app.use(logger("dev"));
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = {
    io,
    cache,
  };
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/contest", contestRouter);
app.use("/submission", submissionRouter);
app.use("/api/conversation", convoRouter);
app.use("/upload", uploadRouter);
app.use("/stripe", stripeRouter);
app.use("/notification", notificationRouter);
app.use("/info", personalInfoRouter);
app.use("/winners", winnerRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = {
  app,
  server,
};
