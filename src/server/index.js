const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const user = require('./models/User');
const order = require('./models/Order');

const port = 8080;
const app = express();
user.initUser();
order.initOrder();

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.use((err, req, res) => {
  console.log(err);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
