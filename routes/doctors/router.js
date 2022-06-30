<<<<<<< HEAD
=======
const router = require('express').Router()
const controller = require('./controller')

// function getDocDetails(req,res){
//     console.log("hello doctor router")
   
//     controller.getDocDetails()
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }


function getDocById(req,res){
    
    console.log("hello doctor router id")
    let doctorId =req.params.doctorId;  
    controller.getDocDetailsById(doctorId)
        .then(data => res.send(data))
        .catch(err => res.status(err.statuscode).send(err))
}


// function getDocByName(req,res){
//     console.log("hello doctor router name")
//     let doctorName=req.params.doctorName;
   
//     controller.getDocDetailsByName(doctorName)
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }

// function setDocByName(req,res){
//     console.log("hello doctor router setname")
//     let doctorName=req.body.doctorName;
   
//     controller.setDocDetailsByName(doctorName)
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }
// function updateDocdetails(req,res){
//     console.log("hello doctor router update")
//     let doctorName=req.body.doctorName;
//     let doctorId=req.body.doctorId;
   
//     controller.updateDocdetails(doctorId,doctorName)
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }
// function deleteById(req,res){
//     console.log("hello doctor router update")
//     let doctorName=req.body.doctorName;
//     let doctorId=req.body.doctorId;
   
//     controller.updateDocdetails(doctorId,doctorName)
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }
// function updateDocdetails(req,res){
//     console.log("hello doctor router update")
//     let doctorName=req.body.doctorName;
//     let doctorId=req.body.doctorId;
   
//     controller.updateDocdetails(doctorId,doctorName)
//         .then(data => res.send(data))
//         .catch(err => res.status(err.statuscode).send(err))
// }
// router.get('/v1/doctorDetail/', getDocDetails)
router.get('/v1/doctorDetail/:doctorId', getDocById)
// router.get('/v1/doctorDetail/:doctorName', getDocByName)
// router.post('/v1/doctorDetail', setDocByName)
// router.put('/v1/doctorDetail', updateDocdetails)
// router.delete('/v1/doctorDetail/:doctorId',deleteById)
// router.delete('/v1/doctorDetail/:doctorName',deleteByName)
>>>>>>> 32fdac530f2bb481de2ffa750372746bff56f600

var router = require('express').Router()
let controller = require('./controller')



// Create new Doctor Account
function createNewDoctorAccount(req, res) {
  console.log("the body is ",req.body)
}


router.post('/create',createNewDoctorAccount)
module.exports = router