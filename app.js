const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
//https://bd9x1naw0g.execute-api.us-east-1.amazonaws.com/v1
restapi = '<restapiId>';
invokeurl = 'https://' + restapi + '.execute-api.us-east-1.amazonaws.com/';
// Handle the POST request from the frontend
app.post('', (req, res) => {
  const selectedOption = req.body.selectedOption;
  const apiUrl = invokeurl + 'v1/?message=' + selectedOption;
  console.log("done");
  console.log(apiUrl);
  
  axios
    .post(apiUrl, null, {
      params: { selectedOption: selectedOption },
    })
    .then((response) => {
      const indexContent = fs.readFileSync("./public/index.html", 'utf8');

      // Send the HTML content as the response
      res.send(indexContent);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Error posting to API Gateway');
    });
});

// Handle the GET request when the refresh button is clicked
app.get('/refresh', (req, res) => {
  // Replace '<RefreshInvokeURL>' with the actual URL you want to invoke
  //refreshApiUrl = invokeurl + 'John'; //John
  let output1, output2, output3;

  // Request for John
  let johnApiUrl = invokeurl + 'Ali';
  axios.get(johnApiUrl)
    .then((response) => {
      console.log(response.data);
      output1 = response.data;

      // Request for Ali
      let aliApiUrl = invokeurl + 'John';
      return axios.get(aliApiUrl);
    })
    .then((response) => {
      console.log(response.data);
      output2 = response.data;

      // Request for Alexa
      let alexaApiUrl = invokeurl + 'Alexa';
      return axios.get(alexaApiUrl);
    })
    .then((response) => {
      console.log(response.data);
      output3 = response.data;

      // Send the combined response
      res.send({ val: output1, val1: output2, val2: output3 });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Error sending refresh request');
    });
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
