const elasticsearch = require("elasticsearch");
const jsonBuilder = require("json-builder");
const { json } = require("express");

let elasticSearchClient = null;

var auth = "elastic" + ":" + "c_gILCMp_S=_3ZzV30Be";
const connstring = "https://" + "localhost" + ":" + "9200";
const enable_password = true;
function connectClient() {
  if (enable_password == true) {
    console.log("inside iffffffffffff");
    elasticSearchClient = new elasticsearch.Client({
      host: [
        {
          host: "localhost",
          port: "9200",
          protocol: "https",
          auth: auth,
          log: "trace",
          requestTimeout: 60000,
        },
      ],
    });
  } else {
    console.log("inside else");
    elasticSearchClient = new elasticsearch.Client({
      host: connstring,
      log: "trace",
      requestTimeout: 60000,
    });
  }

  elasticSearchClient.ping({ requestTimeout: 30000 }, function (error) {
    if (error) {
      console.log("Elasticsearch is down :" + error);
    } else {
      console.log("Elasicsearch up and running!!");
    }
  });
}

//get doctor data with the help of docId
function getData(queryBody, paramIndex) {
  //console.log("hello elastic ")
  if (elasticSearchClient == null) {
    connectClient();
  }

  // return new Promise((resolve, reject) => {
  //       elasticSearchClient.search({
  //             index: paramIndex,
  //             body: queryBody

  //     }).then((result) => {
  //         //console.log("33333")
  //         log.info('Results: ' + result);
  //         resolve(result)
  //     }).catch((err) => {
  //         //console.log("444444444")
  //         log.error('error: ' + err);
  //         reject(err)
  //     })
  // })

  return elasticSearchClient
    .search({
      index: paramIndex,
      body: queryBody,
    })
    .then(function (resp) {
      console.log("here");
      if (resp.hits.total.value == 0)
        return { statuscode: 404, message: "No such doctor exist" };
      else return resp.hits;
    });
}

//update doctor language with the help of docId
// address,ailmentsTreated,city ,firstName ,lastName, name ,gender, landmark ,locality, phone ,state ,yearsOfExperience
function updateData(paramIndex, Identifier, body) {
  if (elasticSearchClient == null) {
    connectClient();
  }

  // return new Promise((resolve, reject) => {
  //       elasticSearchClient.search({
  //             index: paramIndex,
  //             body: queryBody

  //     }).then((result) => {
  //         //console.log("33333")
  //         log.info('Results: ' + result);
  //         resolve(result)
  //     }).catch((err) => {
  //         //console.log("444444444")
  //         log.error('error: ' + err);
  //         reject(err)
  //     })
  // })
  // let updateRequest = jsonBuilder()
  //     .startObject()
  //         .field(fieldName, updateField)
  //     .endObject()

  //     console.log("updateRequest", updateRequest)

  //     let obj=

  // client.update(updateRequest).get();

  // if(fieldName=='languages'){
  return elasticSearchClient
    .update({
      index: paramIndex,
      id: Identifier,
      body: {
        doc: body,
      },
    })
    .then(function (resp) {
      if (resp.result == "updated") {
        console.log("language successfully updated");
        return resp;
      } else {
        return {
          statuscode: 400,
          message: "please enter a new language to update ",
        };
      }
    });
}

function createEntity(object, paramIndex) {
  //  //console.log("Esdb invoked perfectly",object)
  if (elasticSearchClient == null) {
    connectClient();
  }

  return new Promise((resolve, reject) => {
    elasticSearchClient
      .index({
        index: paramIndex,

        body: object,
      })
      .then((result) => {
        // return { statuscode: 200, message: "Doctor Created Successfully"}
        //console.log("The result is ",result)
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

  // //console.log("logging data")
  // return elasticSearchClient.index({
  //     index: paramIndex,
  //     document: object
  // }).then(function(resp) {
  //     //console.log("here")
  //   return resp.status(200).json({message:'Doctor profile created successfuly'})

  // }).catch(err=>{
  //     return   { statuscode: 404, message: "Doctor profile Creation Failed"}
  // });
}

module.exports = {
  getData,
  createEntity,
  updateData,
};
