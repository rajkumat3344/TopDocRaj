let router = require('express').Router()
let controller = require('./controller')

function getSchedule(req, res) {
    let doctorId = req.params.doctorId
    
    controller.getSchedule(doctorId)
        .then(data => res.send(data))
        .catch(err => res.status(err.statuscode).send(err))
}


router.get('/v1/schedule/:doctorId', getSchedule)

module.exports = router