const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const port = 3210;

app.use(helmet());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', () => {
  res.render('index.html');
});

app.listen(port, () => {
  console.log(`> Webgl viewer app is listening on port: ${port}`);
});
