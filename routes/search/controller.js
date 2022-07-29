const esdb = require("../../ESUtils/elasticSearch");



async function getSearchDetails(body) { 
    console.log("in controller")
    console.log(body)
    // let esType = "searchType"
        let esIndex = "doctor"
        let esTemplate = "doctor_template"
    let params = {}
    params.sizeValue = body.pageSize;
    params.fromValue = body.pageNo;
    params.queryValue = body.query;
    // params.boolFilter = true;
    // params.filterGender = true;
    // params.genderValue = "male";


    let result = esdb.templateSearch(params, esIndex, esTemplate)
    console.log(result)
    return result
}

module.exports = {
    getSearchDetails
  };
