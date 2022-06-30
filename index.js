var express = require('express')
//const bp = require('body-parser')

var app = express()

// app.use(bp.urlencoded({ extended: true }))
// app.use(bp.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.use('/appoint', require('./routes/appointments/router'))
app.use('/api', require('./routes/search/router'))
app.use('/api', require('./routes/users/router'))
app.use('/doctor', require('./routes/doctors/router'))




module.exports = app