require("dotenv").config();
let createError = require("http-errors");
const cors = require("cors");
let express = require("express");
let app = express();
const errorHandler = require("./middlewares/errorHandler");
// chat
const CloudControls = require("./cloud/cloudControl");
const Chat = require("./schema/chatroom");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Message = require("./schema/message");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  //hia
  // Handle chat events
  socket.on("sendMessage", async (data) => {
    try {
      const { chatId, userId, username, role, content, createdAt } = data;
      const res = await Message.create(data);
      io.emit("message", res);
      await CloudControls.sendNotifications(chatId, username);
      const chat = await Chat.findById(chatId);
      await chat.message.push(res._id);
      await chat.save();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  socket.on("getChatHistory", async () => {
    const messages = await Message.find({}).exec();
    socket.emit("chatHistory", messages);
  });

  socket.on("disconnect", () => {});
});
// -----
let path = require("path");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let logger = require("morgan");
const exphbs = require("express-handlebars");

let indexRouter = require("./routes/index");

const connect = require("./config/db");
const mongoURI = process.env.MONGO_URI;
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
const sessionSecret = process.env.SESSION_SECRET;

//implement cors
app.use(cors());
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay, secure: false },
    resave: false,
  })
);

app.engine(
  "hbs",
  exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).render("error", {
    pageTitle: "404 Not Found",
    errorMessage: "Page not found.",
  });
});

// Error route
app.get("/error", (req, res) => {
  res.status(500);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
let PORT = process.env.PORT || 3000;
const start = async (url) => {
  try {
    await connect(url);
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};
start(mongoURI);
module.exports = { app, io };
