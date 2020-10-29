var rp = require('request-promise');
const {
  dialogflow,
   Permission,
 } = require('actions-on-google');


const app = dialogflow();


// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
    // conv.user.storage = {}; // to reset user data everytime 
 
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
 
          conv.ask(`Hi again, ${name}, May I help you!`);        

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
        console.log("Frist time");
        conv.user.storage.userName = conv.user.name.display;
        conv.user.storage.emailaddress=params.mailid;
        conv.user.storage.password=params.password;
        conv.user.storage.token=output;
        conv.ask(`Thanks, ${conv.user.storage.userName}. I am a vartiual Assistant, Please let me Known, may o help you! `); 
     
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
 
         if(body1.data.status_code==1){
          resolve(body1.data.status_text);
          }
       
       
      })
      .catch(function (err) {
          reject("Shipment does not exist! or Something went wrong!");
      });
  });   
  }

 
  



  //==========================================

  // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
