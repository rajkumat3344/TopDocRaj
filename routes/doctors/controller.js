const esdb = require("../../ESUtils/elasticSearch");

<<<<<<< HEAD


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
=======
//get doctor data with the help of docId
async function getProfileDetailsController(Identifier, role, fieldsToFetch) {
  try {
    let queryBody;
    if (fieldsToFetch[0] === "all") {
      queryBody = {
        _source: true,
        query: {
          term: {
            _id: {
              value: Identifier,
            },
          },
        },
      };
    } else {
      queryBody = {
        _source: false,
        query: {
          term: {
            _id: {
              value: Identifier,
            },
          },
        },
        fields: fieldsToFetch,
      };
>>>>>>> 449983e46e074372af6fb8d9c80b62b23d3fcc8e
    }

    return esdb.getData(queryBody, role);
  } catch (err) {
    return {
      statuscode: 404,
      message: "There was some error in fetchig the doctors list",
    };
  }
}

//update profile data
async function updateProfileDetailsController(Identifier, role , updateFields) {
  try {
    return esdb.updateData(role, Identifier, updateFields);
  } catch (err) {
    return {
      statuscode: 404,
      message: "There was some error in fetchig the doctors list",
    };
  }
}

<<<<<<< HEAD
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
=======
//create new doctor
async function createNewDoctorAccount(object) {
  try {
    const { v4: uuidv4 } = require("uuid");
    const newId = uuidv4();
    object.id = newId;
    //console.log("The request in controller is ",object)
    //console.log("The uuid is ",newId)

    let entityCreationObj = await esdb.createEntity(object, "doctor");
    //console.log("entityCreationObj",entityCreationObj)
    return { statuscode: 200, message: "Profile created Successfully" };
  } catch (err) {
    return {
      statuscode: 404,
      message: "There was some error in creating profile",
      err,
    };
  }
}
module.exports = {
  getProfileDetailsController,
  createNewDoctorAccount,
 updateProfileDetailsController,
};
>>>>>>> 449983e46e074372af6fb8d9c80b62b23d3fcc8e
