const esdb = require("../../ESUtils/elasticSearch");

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
