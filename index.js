var express = require('express')

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api', require('./routes/appointments/router'))
app.use('/api', require('./routes/search/router'))
app.use('/user', require('./routes/users/router'))
app.use('/doctors',require('./routes/doctors/router'))

module.exports = app