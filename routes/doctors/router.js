
var router = require('express').Router()
let controller = require('./controller')



// Create new Doctor Account
function createNewDoctorAccount(req, res) {
  console.log("the body is ",req.body)
}


router.post('/create',createNewDoctorAccount)
module.exports = router