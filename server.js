var express = require('express');
var cors = require('cors');
var app = express();
var opensslRouter = require('./src/routes/opensslRoutes');

app.use(cors());
app.use(express.json());
app.use('/openssl', opensslRouter);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});