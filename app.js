const express = require('express');
const axios = require('axios'); // Add this line
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

let count = 0;

// Handle the POST request from the frontend
app.post('/api/post', (req, res) => {
  const selectedOption = req.body.selectedOption;
  count++;
  apiUrl = '<InvokeURL>/?message=' + selectedOption;
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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
