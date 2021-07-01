const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// log all requests
app.use('/', function (req, res, next) {
    console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
    next();
});

// serve static page for now
var options = {
    dotfile: 'ignore',
    extensions: ['htm', 'html'],
    index: 'index.html'
}
app.use('/', express.static('./public', options));

// start
app.listen(port, function () {
    console.log(`Listening to port ${port}`);
})