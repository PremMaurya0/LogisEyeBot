
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const request = require('request');

// Init App
const app = express();
 
const http = require('http').Server(app); 


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
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



  app.post('/newuser', function(req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://api.freshchat.com/v2/users',
        'headers': {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":req.body.email,"avatar":{"url":"https://web.freshchat.com/img/johndoe.png"},"phone":"123456789","properties":[{"name":"orderId","value":"#1242"}],"first_name":req.body.fname,"last_name":req.body.fname})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        var jsonData=JSON.parse(response.body);
        localStorage.setItem('userId', jsonData.id);
        res.send(jsonData);
      });
      
  
   });





   app.post('/newconversation', function(req, res) {
       console.log(localStorage.getItem('userId'))
    var options = {
        'method': 'POST',
        'url': 'https://api.freshchat.com/v2/conversations',
        'headers': {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"app_id":"376a68e2-ab40-46ae-b77f-775ff911fe64","channel_id":"af8f3f31-f6aa-4ffc-aba4-559ac29572ff","messages":[{"app_id":"376a68e2-ab40-46ae-b77f-775ff911fe64","actor_type":"user","actor_id":localStorage.getItem('userId'),"channel_id":"af8f3f31-f6aa-4ffc-aba4-559ac29572ff","message_type":"normal","message_parts":[{"text":{"content":req.body.message}}]}],"status":"new","users":[{"id":localStorage.getItem('userId')}]})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
        var jsonData=JSON.parse(response.body);
        localStorage.setItem('conversation_id', jsonData.conversation_id);
        res.send(response.body);
      });
      
      
  
   });


   app.get('/allconversation', function(req, res) {
    console.log(localStorage.getItem('userId'))
    var options = {
     'method': 'GET',
     'url': 'https://api.freshchat.com/v2/conversations/'+localStorage.getItem('conversation_id'),
     'headers': {
       'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw'
     }
   };
   request(options, function (error, response) {
     if (error) throw new Error(error);
   // console.log(response.body);
     //var jsonData=JSON.parse(response.body);
     //localStorage.setItem('conversationId', jsonData.conversation_id);
     res.send(response.body);
   });
   });


   app.get('/allconversationList', function(req, res) {

    var options = {
        'method': 'GET',
        'url': 'https://api.freshchat.com/v2/conversations/'+localStorage.getItem('conversation_id')+'/messages?items_per_page=10&page=1',
        'headers': {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpS216TTVkenRIWmprdmdSY3VrVHgxTzJ2SFlTM0U5YmVJME9XbXRNR1ZzIn0.eyJqdGkiOiI5OTExM2RhZi1jY2U1LTQxYTgtYjQxMC01ZDMxZjgzNDM5NDAiLCJleHAiOjE5MTk0MTQ4ODMsIm5iZiI6MCwiaWF0IjoxNjA0MDU0ODgzLCJpc3MiOiJodHRwOi8vaW50ZXJuYWwtZmMtdXNlMS0wMC1rZXljbG9hay1vYXV0aC0xMzA3MzU3NDU5LnVzLWVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hdXRoL3JlYWxtcy9wcm9kdWN0aW9uIiwiYXVkIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4Iiwic3ViIjoiODNjNGI0Y2ItMTQ4My00NTRhLTliMjAtOGY3NDBlNmE1NjFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGRkMzI3Y2EtNGVlMS00Y2MzLWI1NjUtNTlkMDRmYzY4Zjc4IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2Q4MmE4ZjctYmMzMi00NmZjLTg3ZmQtY2VhODMwZTZmNTQ2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJhZ2VudDp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgYWdlbnQ6Y3JlYXRlIG1lc3NhZ2U6Z2V0IGRhc2hib2FyZDpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIHJlcG9ydHM6cmVhZCBhZ2VudDpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgdXNlcjpkZWxldGUgY29udmVyc2F0aW9uOmNyZWF0ZSBvdXRib3VuZG1lc3NhZ2U6Z2V0IG91dGJvdW5kbWVzc2FnZTpzZW5kIHVzZXI6Y3JlYXRlIHJlcG9ydHM6ZmV0Y2ggdXNlcjp1cGRhdGUgdXNlcjpyZWFkIGJpbGxpbmc6dXBkYXRlIHJlcG9ydHM6ZXh0cmFjdCBjb252ZXJzYXRpb246cmVhZCIsImNsaWVudEhvc3QiOiIxOTIuMTY4LjEyOS4yNDkiLCJjbGllbnRJZCI6ImRkZDMyN2NhLTRlZTEtNGNjMy1iNTY1LTU5ZDA0ZmM2OGY3OCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjEyOS4yNDkifQ.JynFPM9aNreYnwVAJdZeDE2xh_4V6i5QxxhWD1qn3Yc4qBrVzXlxjAHpHV8Y3yODqUHvEK4c50Vm_fuznOobHl9FpSMvymK7IzpYedkuzhUFHjOmQCmRDfeWaB8xRKSzzst-lrrSN0ZPRZOprdjD-lHDyu_ijRZXYkCqULL4Ud8KtpqzKoe3srFOHnaYtdbG2GMImIaqPo38Tt-tjcOzWuR7rezMW0IQFRFyTSv8UMwpaoH7n4mzxh6jCwv9BLisXApr8sgtZmJAWbcVahPr784KligkBDt7UiXScQtYcxX__uQaOQCLcDbNVeWtMOTpc9NZ_28zxZxE63abGVC3Gw',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"actor_type":"user","actor_id":localStorage.getItem('userId'),"message_type":"normal","message_parts":[{"text":{"content":"I need api token, how to get?"}}]})
      
      };
   request(options, function (error, response) {
     if (error) throw new Error(error);
   // console.log(response.body);
     //var jsonData=JSON.parse(response.body);
     //localStorage.setItem('conversationId', jsonData.conversation_id);
     res.send(response.body);
   });

   

});

  
  //console.log(localStorage.getItem('channelId'));
  
  


http.listen(3001,(err)=>{
    if(err) throw err;
      console.log('Listing To port http://localhost:3001');
})
