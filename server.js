require('dotenv').config();
require('dotenv').config({ path: './.env.development' });
require('dotenv').config({ path: './.env.test' });
require('dotenv').config({ path: './.env.production' });

const cors = require('cors');
const express = require('express');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
const { router } = require('./routes/index');

const PORT = process.env.SERVER_PORT || 5000;
app.use(bodyParser.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
