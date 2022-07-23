const router = require('express').Router()

function getDetails(req, res) {
    console.log("Hitting")
    let doctorId = req.params.doctorId
    
}




router.get('/v1/searchDoctor', getDetails)
// router.get('/v1/search/user', getSchedule)
// router.get('/v1/appointment/book/', getSchedule)


module.exports = router