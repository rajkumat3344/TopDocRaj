var express = require('express')

var app = express()
app.use(express.json());

app.use('/api', require('./routes/appointments/router'))
app.use('/api', require('./routes/search/router'))
app.use('/api', require('./routes/users/router'))
app.use('/api',require('./routes/doctors/router'))
module.exports = app