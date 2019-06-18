const express = require('express');
const os = require('os');
import {items} from '../data/fixtures';

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username });
});

app.use(express.static('dist'));
app.get('/api/hello', (req, res) => {
  console.log('hello');
  console.log(items);
  res.send(JSON.stringify({ hello: 'hello' }));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
