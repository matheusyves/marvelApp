'use strict'
var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var SECRET = 'SFMarvel';
var bodyParser = require('body-parser');

// App
var app = express();
app.use(cors());
app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.json());

function verifica(req, res, next){
  const token = req.headers['x-access-token'];
  console.log("token", token);
  jwt.verify(token, SECRET, (err, decoded) =>{
    if(err) return res.status(401).end();
    req.userId = decoded.userId;
    next();
  });
};

app.get('/cliente', verifica, (req, res) =>{
  res.json([{id: 1, nome: 'SFMarvel'}]);
});

app.post('/login', (req, res) =>{
  if(req.body.user ==='SFMarvel' && req.body.password === '1234'){
    const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 600});
    return res.json({auth: true, token});
  }
  res.status(401).end();
});

app.post('/logout', function(req, res){
  res.end();
})

app.use('/', express.static(__dirname + '/app'));

app.listen(app.get('port'), function() {
  console.log("running: port", app.get('port'));
});