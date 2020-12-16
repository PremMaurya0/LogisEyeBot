const compression = require('compression')
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
var rp = require('request-promise');
const path = require('path');
const https = require('https');
const fs = require('fs');

const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();
//const server = express();
//const http = require('http').Server(app); 

app.use(compression())
app.use(bodyParser.json())
app.use(cors());

var options={
  
  key: fs.readFileSync(path.join(__dirname,'ssl','logiseyelogibot.com.key'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname,'ssl','463e828632464557.crt'), 'utf8'),
  ca: [fs.readFileSync(path.join(__dirname,'ssl','gd1.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd2.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd3.crt'))]
  }
  



app.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
    intentMap.set("order_status", welcome);
    agent.handleRequest(intentMap);
});


function welcome(agent) {
 
    return callApitoken(agent.contexts[0].parameters["email"],agent.contexts[0].parameters["pass"]).then((output) => {  
        return callApiOrder(agent.contexts[0].parameters["shipment_no"],output).then((output1) => {     
          agent.add(output1);     
        }).catch((err) => { 
            agent.add("Invalid Shipment Number or Something went wrong!");        
        });
      }).catch((err) => {  
        agent.add("Invalid Email or password!");   
         
      });  
}



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
    


      https.createServer(options, app).listen(4444, () => {
        console.log('Express server started on port 4444');
      });


