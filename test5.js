
const dialogflow = require('@google-cloud/dialogflow');
//const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');
const request = require('request');
const session = require('express-session') 
// Init App
const app = express();
//const http = require('http').Server(app); 
app.use(bodyParser.json({limit: '500000mb'}));
app.use(bodyParser.urlencoded({limit: '500000mb', extended: false, parameterLimit: 10000000000}));
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Accept, Authorization, authorization');
    res.header('Access-Control-Allow-Methods','OPTIONS,GET, POST, PUT, DELETE');
     next();
  });
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Session Setup 
app.use(session({ 
  
    // It holds the secret key for session 
    secret: 'PremMauryaTSS', 
  
    // Forces the session to be saved 
    // back to the session store 
    resave: true, 
  
    // Forces a session that is "uninitialized" 
    // to be saved to the store 
    saveUninitialized: true
})) 


var options={
  
  key: fs.readFileSync(path.join(__dirname,'ssl','logiseyelogibot.com.key'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname,'ssl','463e828632464557.crt'), 'utf8'),
  ca: [fs.readFileSync(path.join(__dirname,'ssl','gd1.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd2.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd3.crt'))]
  }


  app.get('/', function(req, res) {
      res.sendFile('bot.html');
    });

  
  app.get('/send-msg', function(req, res) {
    
    const sessionId = uuid.v4();
    req.session.name = sessionId;
    res.send(req.session.name);
   
  });
  app.get('/send-msg2', function(req, res) {
    
    console.log("Get ==> ", req.session);
    res.send(req.session.name);
  });

  app.post('/send-msg', async function(req, res) {
   
   if(req.body.sessionToken!=""){
    await runSample(req.body.MSG,req.body.sessionToken).then(data=>{
      console.log(data);
      res.send(data);
    })
   }else{
     console.log("Please refresh page");
   }
    
    
  });


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,sessionid,projectId = 'logisfaq-oblb') {
   
 
  // A unique identifier for the given session
  console.log("Inner== > ",sessionid);

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"public/logisfaq-oblb-f0290887e93e.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionid);
 console.log("==> ",msg);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  //console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  //console.log(result.fulfillmentMessages[0].simpleResponses.simpleResponses[0].textToSpeech);
  //console.log(result.fulfillmentMessages[1].linkOutSuggestion.destinationName);
  
  //console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  var newdata={};
  if(result.fulfillmentText=='' || result.fulfillmentText==undefined){
   newdata={txt:result.fulfillmentMessages[0].simpleResponses.simpleResponses[0].textToSpeech,destinationName:result.fulfillmentMessages[1].linkOutSuggestion.destinationName,uri:result.fulfillmentMessages[1].linkOutSuggestion.uri};

     
  }else{
    newdata={txt:result.fulfillmentText,destinationName:"",uri:""}
  }
  return await newdata;
}
//runSample();


 

app.post('/sendlogin', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
 var options = {
  'method': 'POST',
  'url': 'https://alpha.logiseye.com/api/login/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"username":req.body.username,"password":req.body.password})

};
request(options, function (error, response) {
  if (error) res.send("invalid");
  try{
    var data=JSON.parse(response.body);
    res.send(data.token);
  }catch(err){
    res.send("invalid")
  }
  
});
});


app.post('/shipmentstatus', function(req, res) {
  console.log(req.body.shipmentNo);
 var options = {
  'method': 'GET',
  'url': 'https://alpha.logiseye.com/shipment/'+req.body.shipmentNo+'/status/',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Token '+req.body.token
  }
};
request(options, function (error, response) {
 // if (error)  res.send("invalid");
  try{
    var data=JSON.parse(response.body);
    res.send(data);
  }catch(err){
    res.send("invalid")
  }
  
});
});

//   http.listen(3002,(err)=>{
//     if(err) throw err;
//       console.log('Listing To port http://localhost:3002');
// })

https.createServer(options, app).listen(443, () => {
    console.log('Express server started on port 443');
  });
