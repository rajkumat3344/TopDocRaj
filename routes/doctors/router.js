const router = require('express').Router()
const controller = require('./controller')


function getDocById(req,res){
    
    //console.log("hello doctor router id")
    let doctorId =req.params.doctorId;  
    controller.getDocDetailsById(doctorId)
        .then(data => res.send(data))
        .catch(err => res.status(err.statuscode).send(err))
}

// Update doctor's Language 

function updateLanguage(req,res){
    
  let doctorId =req.body.id;  
  if(req.body.hasOwnProperty('id') == false || req.body.id == null || req.body.id == ""){
    res.status(400).send("bad request, id cannot be empty")
} else if(req.body.hasOwnProperty('language') == false || req.body.language == null || req.body.language == ""){
  res.status(400).send("bad request, langauge cannot be empty")
}else{controller.updateLanguage(doctorId,req.body.language)
  .then(data => res.send(data))
  .catch(err => res.status(err.statuscode).send(err))
}

  
}

//Create new Doctor Account
function createNewDoctorAccount(req, res) {
  //console.log("the body is ",req.body)
  if(req.body.hasOwnProperty('address') == false ){
    res.status(400).send("bad request, address field is missing")
}
else if(req.body.hasOwnProperty('ailmentsTreated') == false ){
    res.status(400).send("bad request, ailmentsTreated field is missing")
}
else if(req.body.hasOwnProperty('averageRating') == false ){
  res.status(400).send("bad request, averageRating field is missing")
}
else if(req.body.hasOwnProperty('city') == false ){
  res.status(400).send("bad request, city field is missing")
}
else if(req.body.hasOwnProperty('country') == false ){
res.status(400).send("bad request, country field is missing")
}

else if(req.body.hasOwnProperty('designation') == false ){
  res.status(400).send("bad request, designation field is missing")
}
else if(req.body.hasOwnProperty('education') == false ){
res.status(400).send("bad request, education field is missing")
}
else if(req.body.hasOwnProperty('email') == false ){
res.status(400).send("bad request, email field is missing")
}
else if(req.body.hasOwnProperty('experience') == false ){
res.status(400).send("bad request, experience field is missing")
}

else if(req.body.hasOwnProperty('firstName') == false ){
  res.status(400).send("bad request, firstName field is missing")
}
else if(req.body.hasOwnProperty('gender') == false ){
res.status(400).send("bad request, gender field is missing")
}
else if(req.body.hasOwnProperty('hospital') == false ){
res.status(400).send("bad request, hospital field is missing")
}
else if(req.body.hasOwnProperty('isPersonAllowed') == false ){
res.status(400).send("bad request, isPersonAllowed field is missing")
}

else if(req.body.hasOwnProperty('isVideoAllowed') == false ){
  res.status(400).send("bad request, isVideoAllowed field is missing")
}
else if(req.body.hasOwnProperty('landmark') == false ){
res.status(400).send("bad request, landmark field is missing")
}
else if(req.body.hasOwnProperty('languages') == false ){
res.status(400).send("bad request, languages field is missing")
}
else if(req.body.hasOwnProperty('lastName') == false ){
res.status(400).send("bad request, lastName field is missing")
}

else if(req.body.hasOwnProperty('licenses') == false ){
  res.status(400).send("bad request, licenses field is missing")
}
else if(req.body.hasOwnProperty('locality') == false ){
res.status(400).send("bad request, locality field is missing")
}
else if(req.body.hasOwnProperty('location') == false ){
res.status(400).send("bad request, location field is missing")
}
else if(req.body.hasOwnProperty('name') == false ){
res.status(400).send("bad request, name field is missing")
}

else if(req.body.hasOwnProperty('phone') == false ){
  res.status(400).send("bad request, phone field is missing")
}
else if(req.body.hasOwnProperty('schedule') == false ){
res.status(400).send("bad request, schedule field is missing")
}
else if(req.body.hasOwnProperty('specialization') == false ){
res.status(400).send("bad request, specialization field is missing")
}
else if(req.body.hasOwnProperty('state') == false ){
res.status(400).send("bad request, state field is missing")
}
else if(req.body.hasOwnProperty('yearsOfExperience') == false ){
  res.status(400).send("bad request, yearsOfExperience field is missing")
  }
else{

  controller.createNewDoctorAccount(req.body)
  .then(data => res.send(data))
  .catch(err => res.status(err.statuscode).send(err))
}
}

router.get('/v1/doctorDetail/:doctorId', getDocById)
router.post('/create',createNewDoctorAccount)

router.post('/updateLanguage',updateLanguage)

module.exports = router

