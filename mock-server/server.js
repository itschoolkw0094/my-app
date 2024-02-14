const process = require("process");
const jsonServer = require('json-server');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const authUser = {
  id: '1',
  username: 'taro',
  displayName: 'Taro Yamada',
  email: 'taro_yamada@example.com',
  profileImageUrl: '',
  description:
    'dummy user',
};

const SECRET_WORD = 'SECRET1234'
const expiresIn = '1h'

const createToken = payload => jwt.sign(payload, SECRET_WORD, {expiresIn})

const veryfyToken = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token, SECRET_WORD, (err, decode) =>
      decode !== undefined ? resolve(decode) : reject(err)
    )
  )

const isAuth = (username, password) => {
  return username === 'username' && password === 'password'
}
  

server.use(express.json());

server.post('/auth/signin', (req, res) => {
  res.set({'Access-Control-Allow-Origin':'*'})
  const { username, password } = req.body
  if (
    !isAuth(username, password)
  ) {
    return res.status(401).json({
      message: 'Username or password are incorrect',
    });
  }
  
  //const access_token = createToken({ username, password })
  res.status(201).json(authUser)
});

server.post('/auth/signout', (req, res) => {
  res.set({'Access-Control-Allow-Origin':'*'})
  const access_token = ""
  res.status(200).json({
    access_token,
    message: 'Sign out successfully',
  });
});

// server.use(/^(?!\/auth).*$/, async (req, res, next) => {

//   //認証ヘッダー形式検証
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401
//     const message = 'Error in authorization format'
//     res.status(status).json({status, message})
//     return
//   }

//   //認証トークンの検証
//   try {
//     await verifyToken(req.headers.authorization.split(' ')[1])
//     next()
//   } catch (err) {
//     //失効している認証トークン
//     const status = 401
//     const message = 'Error access_token is revoked'
//     res.status(status).json({status, message})
//   }
// })

// server.get('/users/me', (req, res) => {
//   res.set({'Access-Control-Allow-Origin':'*'})
//   console.log('CookiesB:', req.cookies['token'])
//   if (req.cookies['token'] !== 'dummy_token') {
//     return res.status(401).json({
//       message: 'Unauthorized',
//     });
//   }

//   res.status(200).json(authUser);
// });

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
