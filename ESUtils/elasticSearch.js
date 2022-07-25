const elasticsearch = require('elasticsearch');
const { json } = require('express');

let elasticSearchClient=null

 var auth = 'elastic' + ":" + 'cmlflG69YzfuZMgN=DUb'
 const connstring = "https://" + 'localhost' + ":" + '9200'
 const enable_password=true;
 function connectClient() {
     if (enable_password == true) {
        console.log('inside iffffffffffff');
         elasticSearchClient = new elasticsearch.Client({
             host: [{
                 host: 'localhost',
                 port: '9200',
                 protocol: "https",
                 auth: auth,
                 log: 'trace',
                 requestTimeout: 60000
             }]
 
         });
     }
     else {
        console.log('inside else')
         elasticSearchClient = new elasticsearch.Client({
             host: connstring,
             log: 'trace',
             requestTimeout: 60000
         });
     }
 
    elasticSearchClient.ping({ requestTimeout: 30000, }, function (error) {
        if (error) {
            console.log('Elasticsearch is down :' + error);
        }
        else {
            console.log('Elasicsearch up and running!!')
        }
    });



}

function updateData(id, paramIndex,updateField) {
    console.log(id +" "+ paramIndex+" "+ updateField);
    if (elasticSearchClient == null) {
        console.log("get");
        connectClient();
    }
    // return new Promise((resolve, reject) => {
    //  return elasticSearchClient.update({
    //     index: paramIndex,
    //     name: "Harsh Bhargav",
    //     doc: {
    //         languages: updateField
    //     }
            
    //     })
        return new Promise((resolve, reject) => {
            elasticSearchClient.update({
                index: paramIndex,
                name: "Harsh Bhargav",
                body: {
                    languages: updateField
                }
            }).then((result) => {
               
                
            }).catch((err) => {
               console.log('error: ' + err);
                reject(result)
            })
        })
    //     .then((result) => {
    //         //console.log("33333")
         
    //         resolve(result)
    //     }).catch((err) => {
    //         console.log(err)
           
    //         reject(err)
    //     })
    // })
    
// return elasticSearchClient.update({
//     index: paramIndex,
//     _id: id,
//     script: {
//         languages: updateField
//     }
// }).then(function(resp) {
//     if(resp.hits.total.value==0)
//     return   { statuscode: 404, message: "No such doctor exist"}   
//     else
//     return resp.hits;
// });
console.log('Hii.');
}



    function getData(queryBody, paramIndex) {
       
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
        
    return elasticSearchClient.search({
        index: paramIndex,
        body: queryBody
    }).then(function(resp) {
        console.log(resp)
        if(resp.hits.total.value==0)
        return   { statuscode: 404, message: "No such doctor exist"}   
        else
        return resp.hits;
    });

    }

    function createEntity(object,paramIndex){
      //  //console.log("Esdb invoked perfectly",object)
        if (elasticSearchClient == null) {
            connectClient();
        }


        return new Promise((resolve, reject) => {
            elasticSearchClient.index({
                index: paramIndex,
            
                body: object
            }).then((result) => {
                // return { statuscode: 200, message: "Doctor Created Successfully"}
  //console.log("The result is ",result)
                resolve(result)
            }).catch((err) => {
              
                reject(err)
            })
        })



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
    updateData
        // createData,
        // updateData,
        // deleteData,
        // updateDataByQuery,
        // templateSearch,
        // bulkData,
        
    };
