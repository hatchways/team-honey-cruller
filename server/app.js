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

const users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  const token = cookie.parse(socket.handshake.headers.cookie).token;
  if (token) {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    socket.tokenId = verifyToken.id;
    console.log(`connected by ID of ${socket.tokenId}`);

    socket.on("add-user", (userId) => {
      addUser(userId, socket.id);
    });

    socket.on("send-message", (senderId, receiverId, message) => {
      const user = getUser(receiverId);
      socket.to(user.socketId).emit("receive-message", {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
      });
    });
  } else {
    socket.on("disconnect", () => {
      console.log("user disconnected");
      removeUser(socket.id);
    });
  }

  socket.on("joinChat", (res) => {
    console.log("inside joinChat");
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
