var router = require('express').Router()

function getDetails(req, res) {
    let doctorId = req.params.doctorId
    
    controller.getSchedule(doctorId)
        .then(data => res.send(data))
        .catch(err => res.status(err.statuscode).send(err))
}




router.get('/v1/search/doctor', getDetails)
// router.get('/v1/search/user', getSchedule)
// router.get('/v1/appointment/book/', getSchedule)


module.exports = router