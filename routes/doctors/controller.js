const esdb = require('../../ESUtils/elasticSearch')



async function getDocDetailsById(identifier, source) {
    try{    
            let queryBody = {
                _source: source,
                "query": {
                    "term": {
                         "_id": {
                              "value": identifier
                        }
                    }
                }
            }
                    
            return esdb.getData(queryBody,"doctor")
          
             
        }
 
    catch(err) {
        return { statuscode: 404, message: "There was some error in fetchig the doctors list"}
    }
}


async function updateLanguage(identifier,languages) {
    try{    
            // let queryBody = {
            //     _source: source,
            //     "query": {
            //         "term": {
            //              "_id": {
            //                   "value": Identifier
            //             }
            //         }
            //     }
            // }
                    
         let obj=    esdb.updateData(identifier,"doctor",languages)
         console.log(obj);
          return obj;
             
        }
 
    catch(err) {
        return { statuscode: 404, message: "There was some error in fetchig the doctors list"}
    }
}

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
    getDocDetailsById,
    createNewDoctorAccount,
    updateLanguage
}
