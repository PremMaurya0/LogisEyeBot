
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const request = require('request');
//var localStorage = require('localStorage');
const https = require('https');
// Init App
const app = express();
 
//const http = require('http').Server(app); 


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  var options={
  
    key: fs.readFileSync(path.join(__dirname,'ssl','logiseyelogibot.com.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname,'ssl','463e828632464557.crt'), 'utf8'),
    ca: [fs.readFileSync(path.join(__dirname,'ssl','gd1.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd2.crt')), fs.readFileSync(path.join(__dirname,'ssl','gd3.crt'))]
    }

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

app.get('/channel', function(req, res) {
   // res.sendFile('bot.html');
   var options = {
    'method': 'GET',
    'url': 'https://api.freshchat.com/v2/channels',
    'headers': {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw'
    },
    form: {
  
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
     var jsonData=JSON.parse(response.body);
     localStorage.setItem('channelId', jsonData.channels[0].id);
    res.send(jsonData.channels[0].welcome_message.message_parts[0].text.content);
  });
 
  });
  function xyz(){ var options = {
    'method': 'GET',
    'url': 'https://api.freshchat.com/v2/channels',
    'headers': {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw'
    },
    form: {
  
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
     var jsonData=JSON.parse(response.body);
     localStorage.setItem('channelId', jsonData.channels[0].id);
  });}

  xyz();

  app.post('/newuser', function(req, res) {
   console.log("create User ",localStorage.getItem('channelId'));
    var options = {
        'method': 'POST',
        'url': 'https://api.freshchat.com/v2/users',
        'headers': {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":req.body.email,"avatar":{"url":"https://web.freshchat.com/img/johndoe.png"},"phone":"123456789","properties":[{"name":req.body.email,"value":Math.floor((Math.random() * 1000) + 1)}],"first_name":req.body.fname,"last_name":req.body.fname})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var jsonData=JSON.parse(response.body);
        console.log(jsonData);
        // localStorage.clear();
        // localStorage.removeItem("userId");
        // localStorage.removeItem('conversation_id')
        
        localStorage.setItem('userId', jsonData.id);
        res.send(jsonData);
      });
      
  
   });


   app.post('/newconversation', function(req, res) {
    console.log("C=>",req.body.message);
    console.log("User=>",req.query.userId);
    console.log(">>>>>>>>> ",localStorage.getItem('channelId'));
   
    
   if(req.query.userId!=undefined || req.query.userId!="" || localStorage.getItem('channelId')!=null || localStorage.getItem('channelId')!=undefined){
      
    var options = {
        'method': 'POST',
        'url': 'https://api.freshchat.com/v2/conversations',
        'headers': {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"app_id":"376a68e2-ab40-46ae-b77f-775ff911fe64","channel_id":localStorage.getItem('channelId'),"messages":[{"app_id":"376a68e2-ab40-46ae-b77f-775ff911fe64","actor_type":"user","actor_id":req.query.userId,"channel_id":localStorage.getItem('channelId'),"message_type":"normal","message_parts":[{"text":{"content":req.body.message}}]}],"status":"new","users":[{"id":req.query.userId}]})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        
        var jsonData=JSON.parse(response.body);
        console.log(jsonData);
        localStorage.setItem('conversation_id', jsonData.conversation_id);
        res.send(response.body);
      });
    }else{
     console.log("something error")
    }
      
      
  
   });


   app.get('/allconversation', function(req, res) {
    
    var options = {
     'method': 'GET',
     'url': 'https://api.freshchat.com/v2/conversations/'+localStorage.getItem('conversation_id'),
     'headers': {
       'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw'
     }
   };
   request(options, function (error, response) {
     if (error) throw new Error(error);
       res.send(response.body);
   });
   });


   app.get('/allconversationList', function(req, res) {
   //console.log(req.query.storage);
   console.log(req.query.convertId);
   console.log("User1=>",req.query.storage);
   console.log(">>>>>>>>>1 ",localStorage.getItem('channelId'));
  
    if( req.query.storage==""  || req.query.storage==undefined){
      localStorage.clear();
      localStorage.removeItem("userId");
    }

      else{
        var options = {
          'method': 'GET',
          'url': 'https://api.freshchat.com/v2/conversations/'+req.query.convertId+'/messages?items_per_page=10&page=1',
          'headers': {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"actor_type":"user","actor_id":req.query.storage,"message_type":"normal","message_parts":[{"text":{"content":"I need api token, how to get?"}}]})
        
        };
     request(options, function (error, response) {
       if (error) throw new Error(error);
     //  console.log()
      // console.log(response.body)
       res.send(response.body);
     });
   
      }
  
   

});

 


// http.listen(3001,(err)=>{
//     if(err) throw err;
//       console.log('Listing To port http://localhost:3001');
// })
https.createServer(options, app).listen(5441, () => {
  console.log('Express server started on port 5441');
});