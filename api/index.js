const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const colors = require('colors');

require('dotenv').config();

const app = express();

//express config
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//express routes
app.use('/api', require('./routes/devices.js'));
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/templates.js"));
app.use("/api", require("./routes/webhooks.js"));
app.use("/api", require("./routes/emqxapi.js"));
app.use("/api", require("./routes/alarms.js"));
app.use("/api", require("./routes/dataprovider.js"));

module.exports = app;

//listener
app.listen(process.env.API_PORT, () => {
    console.log('Server on port ' + process.env.API_PORT.green);
});

//endpoint test
app.get("/testing", (req, res) => {
    console.log("Hello World");
});

//mongo connection
const mongoUserName = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDataBase = process.env.MONGO_DATABASE;

const mongoUri = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDataBase}`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    authSource: 'admin'
}

    mongoose.connect(mongoUri, options).then(
        () => {
          console.log("\n");
          console.log("*******************************".green);
          console.log("✔ Mongo Successfully Connected!".green);
          console.log("*******************************".green);
          console.log("\n");
        },
        (err) => {
          console.log("\n");
          console.log("*******************************".red);
          console.log("    Mongo Connection Failed    ".red);
          console.log("*******************************".red);
          console.log("\n");
          console.log(err);
        }
      );

