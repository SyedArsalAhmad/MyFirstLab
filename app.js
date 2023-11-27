const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle the POST request from the frontend
app.post('', (req, res) => {
  const selectedOption = req.body.selectedOption;
  const apiUrl = '<InvokeURL>/?message=' + selectedOption;
  console.log("done");
  console.log(apiUrl);
  
  axios
    .post(apiUrl, null, {
      params: { selectedOption: selectedOption },
    })
    .then((response) => {
      res.send(`Vote posted to API Gateway with selected option: ${selectedOption}`);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Error posting to API Gateway');
    });
});

// Handle the GET request when the refresh button is clicked
app.get('/refresh', (req, res) => {
  // Replace '<RefreshInvokeURL>' with the actual URL you want to invoke
  const refreshApiUrl = 'https://27r0at5156.execute-api.us-east-1.amazonaws.com/v1';
  axios
    .get(refreshApiUrl)
    .then((response) => {
      console.log(response.data)
      res.send(`Refresh request sent to: ${refreshApiUrl}`);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Error sending refresh request');
    });
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
