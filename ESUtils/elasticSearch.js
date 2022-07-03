const elasticsearch = require('elasticsearch');
const { json } = require('express');

let elasticSearchClient=null

 var auth = 'elastic' + ":" + 'j*+44bej_O0ZsUlUxFH5'
 const connstring = "https://" + 'localhost' + ":" + '9200'
 const enable_password=true;
 function connectClient() {
     if (enable_password == true) {
        ////console.log('inside iffffffffffff')
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
        ////console.log('inside else')
         elasticSearchClient = new elasticsearch.Client({
             host: connstring,
             log: 'trace',
             requestTimeout: 60000
         });
     }
 
    elasticSearchClient.ping({ requestTimeout: 30000, }, function (error) {
        if (error) {
            //console.log('Elasticsearch is down :' + error);
        }
        else {
            //console.log('Elasicsearch up and running!!')
        }
    });



}





    function getData(queryBody, paramIndex) {
        ////console.log("index : ",indexDict[paramIndex])
        ////console.log("Type : ",indexDict[paramType])
        //console.log("hello elastic ")
        if (elasticSearchClient == null) {
            connectClient();
            //console.log("1111")
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
        //console.log("here")
        if(resp.hits.total.value==1)
        return resp.hits;
        else
        return   { statuscode: 404, message: "No such doctor exist"}

    });

    }

    function demo(){
       return //console.log("function called")
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
        demo
        // createData,
        // updateData,
        // deleteData,
        // updateDataByQuery,
        // templateSearch,
        // bulkData,
        
    };
