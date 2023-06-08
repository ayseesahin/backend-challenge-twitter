//import
const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require('morgan');
const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const tweetsRouter = require("../api/tweets/tweets-router");
const commentsRouter = require("../api/comments/comments-router");
const likesRouter = require("../api/likes/likes-router");

const { restricted } = require('./auth/auth-middleware')



//global middleware
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

//router
server.get('/', (req,res)=> {
  res.send('Server up and running...')
})

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);
server.use("/api/tweets", restricted, tweetsRouter);
server.use("/api/comments", commentsRouter);
server.use("/api/likes", likesRouter);


//error middleware
server.use((err,req,res,next)=>{
  res.status(err.status || 500)
      .json({
          message: err.message || "Server Error!..."
      })
})

module.exports = server;
