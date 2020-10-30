const compression = require('compression')
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
var rp = require('request-promise');
const path = require('path');
const https = require('https');
const fs = require('fs');

const {
  dialogflow,
   Permission,
   Suggestions,
 } = require('actions-on-google');

const server = express();
//const http = require('http').Server(server); 

const app = dialogflow();
server.use(compression())
server.use(bodyParser.json())
server.use(cors());
var options={
  //ca: fs.readFileSync(path.join(__dirname,'ssl','logiseyeTSS.pem'), 'utf8'),
  key: fs.readFileSync(path.join(__dirname,'ssl','privkey.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname,'ssl','cert.pem'), 'utf8'),
  }


// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
     //conv.user.storage = {}; // to reset user data everytime 
    // conv.ask(new Suggestions('Yes'));
    const name = conv.user.storage.userName;
    const emailaddress = conv.user.storage.emailaddress;
    const password   = conv.user.storage.password;
   
  console.log(conv.user.storage);
    if (name==undefined || name==null || emailaddress==undefined || password==undefined) {
        // Asks the user's permission to know their name, for personalization.
        conv.ask(new Permission({
          context: 'Hi there, to get to know you better',
          permissions: 'NAME',
        }));
      }
        else{
 
          conv.ask(`Hi again, ${name} `);        

        }
    
    
  });
  
  // Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
  // agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
  
   app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
   
  
    if (!permissionGranted) {
      // If the user denied our request, go ahead with the conversation.
      conv.ask(`Need your name in order to remember your preferences`);
      
    } else {
      // If the user accepted our request, store their name in
      // the 'conv.user.storage' object for future conversations.
    
    return callApitoken(params.mailid,params.password).then((output)=>{
       // console.log("Frist time");
        conv.user.storage.userName = conv.user.name.display;
        conv.user.storage.emailaddress=params.mailid;
        conv.user.storage.password=params.password;
        conv.user.storage.token=output;
        conv.ask(`Thanks, ${conv.user.storage.userName}. Welcome to Logiseye,I am a virtual Assistant,May I help you!?`); 
     
    }).catch((err) => {  
      conv.user.storage = {};  
       conv.ask(`${err}`); 
       conv.close();
    });

    
    }
  });
  
  
  app.intent('order_status', (conv, {shipmentNo} )=> {
 
     return callApiOrder(shipmentNo,conv.user.storage.token).then((output) => {  
      conv.ask(output); 
      conv.close();
    }).catch((err) => {    
      conv.ask(err); 
      conv.close();
    });
  
      
  });
 
 function callApitoken (email,password) {

  return new Promise((resolve, reject) => {
   
  var options = { 
    method: 'POST',
    url: 'https://alpha.logiseye.com/api/login/',
    headers:{ 
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
  body:JSON.stringify({"username":email,"password":password}),
  };
  rp(options)
  .then(function (response) {
        var body1 = JSON.parse(response);  
         resolve(body1.token); 
    })
    .catch(function (err) {
        reject("Logiseye register email or password is wrong!! Please try again later");
    });
});   
}


  function callApiOrder (shipernumber,token) {
 
    return new Promise((resolve, reject) => {
    var options = { 
      method: 'GET',
      url: 'https://alpha.logiseye.com/shipment/'+shipernumber+'/status/',
      headers:{ 
        'Authorization': "Token "+token,
      }     
    };
  
    rp(options)
    .then(function (body) {
          var body1 = JSON.parse(body); 
          var quantity=0;
        // if(body1.data.status_code==1){
          if(body1.data.total_quantity=="" || body1.data.total_quantity==null){
            quantity=0;
          }else{
            quantity=body1.data.total_quantity;
          }
          resolve(`Your ${body1.data.status_text}, and your total quantity ${quantity}`);
         // }
       
       
      })
      .catch(function (err) {
          reject("Shipment does not exist! or Something went wrong!");
      });
  });   
  }

  
  server.post('/webhook', app);
  
//   http.listen(3002,(err)=>{
//     if(err) throw err;
//       console.log('Listing To port http://localhost:3002');
// })
https.createServer(options, app).listen(5443, () => {
  console.log('Express server started on port 5443');
});
  