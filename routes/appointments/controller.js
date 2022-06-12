

async function getSchedule(doctorId) {
    try{
        return {
            test: doctorId
        }
    }catch(err) {
        return { statuscode: 500, message: "Unexpected error occured"}
    }
}

module.exports = {
    getSchedule
}