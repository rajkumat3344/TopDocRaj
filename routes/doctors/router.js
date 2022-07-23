const router = require("express").Router();
const controller = require("./controller");
const docPostSchema = require("./docPostSchema");
var _ = require("underscore");

//get doctor details by his/her id
function getProfileDetails(req, res) {
  let doctorId;
  let fieldsToFetch;
  let role;
  console.log("hello doctor router id");
  if (
    req.body.hasOwnProperty("id") == false ||
    req.body.id == null ||
    req.body.id == ""
  ) {
    res.status(400).send("bad request , id cannot be empty");
  } else if (
    req.body.hasOwnProperty("role") == false ||
    req.body.role == null ||
    req.body.role == ""
  ) {
    res.status(400).send("bad request , role cannot be empty");
  } else {
    doctorId = req.body.id;
    role = req.body.role;
    fieldsToFetch = req.body.fields;
  }
  controller
    .getProfileDetailsController(doctorId, role, fieldsToFetch)
    .then((data) => res.send(data))
    .catch((err) => res.status(err.statuscode).send(err));
}

//update doctor details
// languages,email,address,ailmentsTreated,city ,firstName ,lastName, name ,gender, landmark ,locality, phone ,state ,yearsOfExperience
//notIncluded-->country,designation,education,experience,hospital,isPersonAllowed,isVideoAllowed,licenses,location,schedule,specialization
function updateDocProfile(req, res) {
  let queryBody = docPostSchema();

  let doctorId = req.body.id;

  console.log(req.body);
  let obj = req.body;
  // console.log(obj);
  delete  obj["id"];
  // obj = _.omit(obj, "id");
  console.log(obj);
  console.log(req.body);
  
  // if (req.body.hasOwnProperty("id") == false || req.body.id == null ||  req.body.id == "") {
  //   res.status(400).send("bad request , id cannot be empty");
  // } else if (req.body.hasOwnProperty("address") == false ||req.body.address == null || req.body.address == "" ) {
  //   res.status(400).send("bad request , address cannot be empty");
  // } else if ( req.body.hasOwnProperty("averageRating") == false || req.body.averageRating == null || req.body.averageRating == "" ) {
  //   res.status(400).send("bad request , averageRating cannot be empty");
  // } else if ( req.body.hasOwnProperty("ailmentsTreated") == false || req.body.ailmentsTreated == null || req.body.ailmentsTreated == "" ) {
  //   res.status(400).send("bad request , ailmentsTreated cannot be empty");
  // }else if ( req.body.hasOwnProperty("city") == false || req.body.city == null || req.body.city == "" ) {
  //   res.status(400).send("bad request , city cannot be empty");
  // }else if ( req.body.hasOwnProperty("country") == false || req.body.country == null || req.body.country == "" ) {
  //   res.status(400).send("bad request , country cannot be empty");
  // }else if ( req.body.hasOwnProperty("designation") == false || req.body.designation == null || req.body.designation == "" ) {
  //   res.status(400).send("bad request , designation cannot be empty");
  // }else if ( req.body.hasOwnProperty("education") == false || req.body.education == null || req.body.education == "" ) {
  //   res.status(400).send("bad request , education cannot be empty");
  // }else if ( req.body.hasOwnProperty("designation") == false || req.body.designation == null || req.body.designation == "" ) {
  //   res.status(400).send("bad request , designation cannot be empty");
  // }
  controller
    .updateDocLanguage(doctorId, req.body)
    .then((data) => res.send(data))
    .catch((err) => res.status(err.statuscode).send(err));
  // console.log((Object.keys(req.body)[1]));
  // controller.updateDocLanguage(doctorId,req.body.language)
  //     .then(data => res.send(data))
  //     .catch(err => res.status(err.statuscode).send(err))

  // if (req.body.hasOwnProperty("languages")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.languages, "languages")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("email")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.email, "email")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("address")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.address, "address")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("ailmentsTreated")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.ailmentsTreated, "ailmentsTreated")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("city")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.city, "city")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("firstName")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.firstName, "firstName")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("lastName")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.lastName, "lastName")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("name")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.name, "name")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("gender")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.gender, "gender")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("landmark")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.landmark, "landmark")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("locality")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.locality, "locality")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("phone")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.phone, "phone")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("state")) {
  //   controller
  //     .updateDocLanguage(doctorId, req.body.state, "state")
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else if (req.body.hasOwnProperty("yearsOfExperience")) {
  //   controller
  //     .updateDocLanguage(
  //       doctorId,
  //       req.body.yearsOfExperience,
  //       "yearsOfExperience"
  //     )
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(err.statuscode).send(err));
  // } else {
  //   res.status(400).send({
  //     statuscode: 400,
  //     message: "bad request, required field is missing",
  //   });
  // }
}

//Create new Doctor Account
function createNewDoctorAccount(req, res) {
  //console.log("the body is ",req.body)
  if (req.body.hasOwnProperty("address") == false) {
    res.status(400).send("bad request, address field is missing");
  } else if (req.body.hasOwnProperty("ailmentsTreated") == false) {
    res.status(400).send("bad request, ailmentsTreated field is missing");
  } else if (req.body.hasOwnProperty("averageRating") == false) {
    res.status(400).send("bad request, averageRating field is missing");
  } else if (req.body.hasOwnProperty("city") == false) {
    res.status(400).send("bad request, city field is missing");
  } else if (req.body.hasOwnProperty("country") == false) {
    res.status(400).send("bad request, country field is missing");
  } else if (req.body.hasOwnProperty("designation") == false) {
    res.status(400).send("bad request, designation field is missing");
  } else if (req.body.hasOwnProperty("education") == false) {
    res.status(400).send("bad request, education field is missing");
  } else if (req.body.hasOwnProperty("email") == false) {
    res.status(400).send("bad request, email field is missing");
  } else if (req.body.hasOwnProperty("experience") == false) {
    res.status(400).send("bad request, experience field is missing");
  } else if (req.body.hasOwnProperty("firstName") == false) {
    res.status(400).send("bad request, firstName field is missing");
  } else if (req.body.hasOwnProperty("gender") == false) {
    res.status(400).send("bad request, gender field is missing");
  } else if (req.body.hasOwnProperty("hospital") == false) {
    res.status(400).send("bad request, hospital field is missing");
  } else if (req.body.hasOwnProperty("isPersonAllowed") == false) {
    res.status(400).send("bad request, isPersonAllowed field is missing");
  } else if (req.body.hasOwnProperty("isVideoAllowed") == false) {
    res.status(400).send("bad request, isVideoAllowed field is missing");
  } else if (req.body.hasOwnProperty("landmark") == false) {
    res.status(400).send("bad request, landmark field is missing");
  } else if (req.body.hasOwnProperty("languages") == false) {
    res.status(400).send("bad request, languages field is missing");
  } else if (req.body.hasOwnProperty("lastName") == false) {
    res.status(400).send("bad request, lastName field is missing");
  } else if (req.body.hasOwnProperty("licenses") == false) {
    res.status(400).send("bad request, licenses field is missing");
  } else if (req.body.hasOwnProperty("locality") == false) {
    res.status(400).send("bad request, locality field is missing");
  } else if (req.body.hasOwnProperty("location") == false) {
    res.status(400).send("bad request, location field is missing");
  } else if (req.body.hasOwnProperty("name") == false) {
    res.status(400).send("bad request, name field is missing");
  } else if (req.body.hasOwnProperty("phone") == false) {
    res.status(400).send("bad request, phone field is missing");
  } else if (req.body.hasOwnProperty("schedule") == false) {
    res.status(400).send("bad request, schedule field is missing");
  } else if (req.body.hasOwnProperty("specialization") == false) {
    res.status(400).send("bad request, specialization field is missing");
  } else if (req.body.hasOwnProperty("state") == false) {
    res.status(400).send("bad request, state field is missing");
  } else if (req.body.hasOwnProperty("yearsOfExperience") == false) {
    res.status(400).send("bad request, yearsOfExperience field is missing");
  } else {
    controller
      .createNewDoctorAccount(req.body)
      .then((data) => res.send(data))
      .catch((err) => res.status(err.statuscode).send(err));
  }
}

router.post("/v1/doctorDetail", getProfileDetails);
router.post("/create", createNewDoctorAccount);
router.patch("/v1/doctorDetail/updateLanguage", updateDocProfile);
module.exports = router;
