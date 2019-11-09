const express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors')


var port = process.env.PORT || 8080;

const url = `mongodb+srv://development:dXMLiQVno0pVDRcY@development-jbawk.azure.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose running')
});

server.use(cors())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', require('./routes/user'))
server.use('/api', require('./routes/vote'))
server.use('/api', require('./routes/candidate'))
server.listen(port);
console.log('Port: ' + port);