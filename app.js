const express = require('express');
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const logger = require('./logger');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('./src');

const repl = require('repl');
let PORT = process.env.PORT || 8080;



app.use(bodyParser.json({ limit: '12mb' }));
app.use(helmet());
app.use(
  cors({
     origin: process.env.WHITELIST_ORIGINS.split("|"),
     credentials: false,
  })
)


app.use(express.static('public'));
if(process.env.NODE_ENV != 'test') app.use(logger.morgan);
app.use('/', require('./api'));

app.listen(PORT, () => {
   console.log('Running app in port ' + PORT);
   repl.start('express: ');
});


module.exports = app;
