const express = require('express');
const bodyParser = require('body-parser');
// const os = require('os');
const router = require('./routes');
const user = require('./models/User');

const port = 8080;
const app = express();
user.initUser();

// app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => {
//   res.send({ username: os.userInfo().username });
// });
//
// app.use(express.static('dist'));
// app.get('/api/hello', (req, res) => {
//   console.log('hello');
//   res.send(JSON.stringify({ hello: 'hello' }));
// });

app.use(bodyParser.json());
app.use('/api', router);

app.use((req, res) => {
  res.send('Hello');
});

app.use((err, req, res) => {
  console.log(err);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
