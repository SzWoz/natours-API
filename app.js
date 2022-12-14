const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello there', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('asasdasd');
});

const port = 3000;
app.listen(port, () => {
  console.log('running');
});
