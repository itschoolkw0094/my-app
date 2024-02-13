const process = require("process");
const jsonServer = require('json-server');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;
const authUser = {
  id: '1',
  username: 'taro',
  displayName: 'Taro Yamada',
  email: 'taro_yamada@example.com',
  profileImageUrl: '',
  description:
    'dummy user',
};

server.use(cookieParser());
server.use(express.json());

server.post('/auth/signin', (req, res) => {
  res.set({'Access-Control-Allow-Origin':'*'})
  if (
    !(req.body['username'] === 'user' && req.body['password'] === 'password')
  ) {
    return res.status(401).json({
      message: 'Username or password are incorrect',
    });
  }
  res.cookie('token', 'dummy_token', {
    maxAge: 3600 * 1000,
    httpOnly: true,
  });
  res.status(201).json(authUser);
});

server.post('/auth/signout', (req, res) => {
  res.set({'Access-Control-Allow-Origin':'*'})
  res.cookie('token', '', {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    message: 'Sign out successfully',
  });
});

server.get('/users/me', (req, res) => {
  res.set({'Access-Control-Allow-Origin':'*'})
  console.log('CookiesB:', req.cookies['token'])
  if (req.cookies['token'] !== 'dummy_token') {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  res.status(200).json(authUser);
});

server.use(middlewares);
server.use(router);
server.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit();
    return;
  }
  console.log("Start listening...");
  console.log('http://localhost:' + port);
});
