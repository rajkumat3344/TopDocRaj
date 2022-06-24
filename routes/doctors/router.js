var router = require('express').Router()

let controller = require('./controller')



// Create new Doctor Account


router.post('/create', function(req,res){
    console.log("Hitting newsssssssssssssssssssssssss",req.body)
})

module.exports = router