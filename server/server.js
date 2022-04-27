const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static('build'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
})