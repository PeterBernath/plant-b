const express = require('express');
const bodyParser = require('body-parser');
// const os = require('os');
const router = require('./routes');
const user = require('./models/User');
const order = require('./models/Order');

const port = 8080;
const app = express();
user.initUser();
order.initOrder();


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
