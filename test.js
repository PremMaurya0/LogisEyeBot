
const dialogflow = require('@google-cloud/dialogflow');
//const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { json } = require('body-parser');
const request = require('request');
// Init App
const app = express();
const sessionId = uuid.v4();
 
const http = require('http').Server(app); 
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

app.get('/', function(req, res) {
    res.sendFile('bot.html');
  });

  app.post('/send-msg', function(req, res) {
    console.log(req.body.MSG);
    runSample(req.body.MSG).then(data=>{
        console.log(data);
        res.send(data);
    })
  });
  




/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'logisfaq-oblb') {
  // A unique identifier for the given session
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"public/logisfaq-oblb-f0290887e93e.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
 
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
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  //console.log(result.fulfillmentMessages[0].simpleResponses.simpleResponses[0].textToSpeech);
  //console.log(result.fulfillmentMessages[1].linkOutSuggestion.destinationName);
  //console.log(result.fulfillmentMessages[1].linkOutSuggestion.uri);
  
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
  return newdata;
}
//runSample();




// var options = {
//   'method': 'POST',
//   'url': 'https://alpha.logiseye.com/api/login/',
//   'headers': {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({"username":"chatbot@logiseye.com","password":"Kochi$5678"})

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
 


``


http.listen(3001,(err)=>{
    if(err) throw err;
      console.log('Listing To port http://localhost:3001');
})