var router = require('express').Router()
var controller = require('./controller')
function test(req, res) {
    res.send("APP SUCCESS")
}


router.get('/users', test)
router.post('/signup',function(req,res){
    console.log(req.body)
    if(req.body.hasOwnProperty('fullName') == false || req.body.fullName == null || req.body.fullName == ""){
        res.status(400).send("Full name is mandatory")
    }
    else if((!(req.body.hasOwnProperty('mobileNumber')) || req.body.mobileNumber == null || req.body.mobileNumber == "") && (!(req.body.hasOwnProperty('emailId')) || req.body.emailId == null || req.body.emailId == "")){
        res.status(400).send("one of Mobile Number or Email id is mandatory")
    }
    else if(!req.body.hasOwnProperty('password')){
        res.status(400).send("Password cannot be empty")
    }
    else if(!req.body.hasOwnProperty('confirmPassword')){
        res.status(400).send("confirmPassword field cannot be empty")
    }
    else{
        if(!validatePassword(req.body.password)){
            res.status(403).send("password is not valid")
        }
        controller.signup(req.body)
            .then(data => res.send(data))
            .catch(err => res.status(err.statuscode).send(err))
    }
})

router.post('/login',function(req,res){
    if(!req.body.hasOwnProperty('loginId') || req.body.loginId == null || req.body.loginId == ""){
        res.status(400).send("Full name is mandatory")
    }
    else if((!(req.body.hasOwnProperty('mobileNumber')) || req.body.mobileNumber == null || req.body.mobileNumber == "") && (!(req.body.hasOwnProperty('emailId')) || req.body.emailId == null || req.body.emailId == "")){
        res.status(400).send("one of Mobile Number or Email id is mandatory")
    }
    else if(!req.body.hasOwnProperty('password')){
        res.status(400).send("Password cannot be empty")
    }
    else if(!req.body.hasOwnProperty('confirmPassword')){
        res.status(400).send("confirmPassword field cannot be empty")
    }
    else{
        if(!validatePassword(req.body.password)){
            res.status(403).send("password is not valid")
        }
        controller.signup(req.body)
            .then(data => res.send(data))
            .catch(err => res.status(err.statuscode).send(err))
    }
})

module.exports = router

