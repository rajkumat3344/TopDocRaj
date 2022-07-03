const esdb = require('../../ESUtils/elasticSearch')


// const doctors=[
//     {doctorId:1 , doctorName:"doc1"},
//     {doctorId:2 , doctorName:"doc2"},
//     {doctorId:3 , doctorName:"doc3"},
//     {doctorId:4 , doctorName:"doc4"},
//     {doctorId:5 , doctorName:"doc5"},

// ];




// async function getDocDetails() {
//     try{ 
        
//             //console.log("hello doctor controller")
            
//             connectClient()
        
//         return doctors;
//     }catch(err) { //console.log('error block'+err)
//         return { statuscode: 404, message: "There is some error in fatchig the doctors list"}
//     }
// }

async function getDocDetailsById(Identifier, source) {
    try{ 
        
            //console.log("hello doctor controller id")
        
            let queryBody = {
                _source: source,
                "query": {
                    "term": {
                         "_id": {
                              "value": Identifier
                        }
                    }
                }
            }
                     //console.log("hello doctor controller id 2") 
            return esdb.getData(queryBody,"doctor")
            //  esdb.demo()
             
        }



        // let doctor =doctors.find(d => d.doctorId===parseInt(doctorId))
        // if(!doctor) throw error ;
        // return doctor

        
        
    catch(err) {
        return { statuscode: 404, message: "There was some error in fetchig the doctors list"}
    }
}









// async function getDocDetailsByName(doctorName) {
//     try{ 
        
//             //console.log("hello doctor controller name")
//         const doctor =doctors.find(d => d.doctorName==doctorName)
//         if(!doctor) throw error ;
//         return doctor
        
        
//     }catch(err) {
//         return { statuscode: 404, message: "There is some error in fatchig the doctors list"}
//     }
// }


// async function setDocDetailsByName(doctorName) {
//     try{ 
        
//             //console.log("hello doctor controller setname")
//         const doctor ={
//             doctorId : doctors.length + 1,
//             doctorName : doctorName
//         };
//        doctors.push(doctor);
//         return doctor
        
        
//     }catch(err) {
//         return { statuscode: 404, message: "There is some error in fatchig the doctors list"}
//     }
// }

// async function updateDocdetails(doctorId,doctorName) {
//     try{ 
        
//             //console.log("hello doctor controller update")
//             let doctor =doctors.find(d => d.doctorId===parseInt(doctorId))
//             if(!doctor) throw error ;   
        
//        doctor.doctorName = doctorName
//         return doctor
        
        
//     }catch(err) {
//         return { statuscode: 404, message: "There is some error in fatchig the doctors list"}
//     }
// }

async function createNewDoctorAccount(object){
    try{
        const {v4 : uuidv4} = require('uuid')
const newId = uuidv4()
object.id=newId
//console.log("The request in controller is ",object)
//console.log("The uuid is ",newId)

let entityCreationObj=await esdb.createEntity(object,'doctor')
//console.log("entityCreationObj",entityCreationObj)
return { statuscode: 200, message: "Profile created Successfully"}

    }
    catch (err){
        return { statuscode: 404, message: "There was some error in creating profile",err}

    }

}
module.exports = {
    // getDocDetails,
    getDocDetailsById,
    createNewDoctorAccount
    // createNewDoctorAccount
    // getDocDetailsByName,
    // setDocDetailsByName,
    // updateDocdetails
}

