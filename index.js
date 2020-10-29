const express = require('express');
const bodyParser = require('body-parser');
 const path = require('path');
 const cors = require('cors');
// require("dotenv").config();
// Init App
const app = express();

const http = require('http').Server(app); 

app.use(bodyParser.json({limit: '500000mb'}));
app.use(bodyParser.urlencoded({limit: '500000mb', extended: true, parameterLimit: 10000000000}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Accept, Authorization, authorization');
  res.header('Access-Control-Allow-Methods','OPTIONS,GET, POST, PUT, DELETE');
   next();
});
 app.use(cors({
    exposedHeaders: ['Authorization', 'authorization'],
  }));
  



app.get('/', function(req, res) {
  res.sendFile('bot.html');
});



http.listen(3002,(err)=>{
    if(err) throw err;
      console.log('Listing To port http://localhost:3001');
})
  