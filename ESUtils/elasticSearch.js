const elasticsearch = require('elasticsearch');



 var auth = 'elastic' + ":" + 'c_gILCMp_S=_3ZzV30Be'
 const connstring = "https://" + 'localhost' + ":" + '9200'
 const enable_password=true;
 function connectClient() {
     if (enable_password == true) {
        console.log('inside if')
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









    function getData(queryBody, paramIndex) {
        //console.log("index : ",indexDict[paramIndex])
        //console.log("Type : ",indexDict[paramType])
        console.log("hello elastic ")
        if (elasticSearchClient == null) {
            connectClient();
        }
        return new Promise((resolve, reject) => {
            elasticSearchClient.search({
                index: indexDict[paramIndex],
                body: queryBody
            }).then((result) => {
                log.info('Results: ' + result);
                resolve(result)
            }).catch((err) => {
                log.error('error: ' + err);
                reject(err)
            })
        })
    }

    function demo(){
       return console.log("function called")
    }
    




    // function createData(queryBody, paramType, paramIndex) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.create({
    //             index: indexDict[paramIndex],
    //             type: indexDict[paramType],
    //             id: queryBody.id,
    //             body: queryBody
    //         }).then((result) => {
    //             log.info('Results: ' + result);
    //             return new Promise((resolve1,reject1) =>{
    //                 elasticSearchClient.indices.flush(
    //                     {
    //                         index: [indexDict["postIndex"], indexDict['threadIndex'], indexDict["userpostactivityIndex"], indexDict["hashtagsIndex"]],
    //                         wait_if_ongoing: false
    //                     }
    //                 )
    //                 .then(result1=>{
    //                     log.info('Results: ' + result1);
    //                     resolve(result)
    //                 })
    //                 .catch((err1) =>{
    //                     log.error('error: ' + err1);
    //                     reject(err1)
    //                 })
    //             })
                
    //            // resolve(result)
    //         }).catch((err) => {
    //             log.error('error: ' + err);
    //             reject(err)
    //         })
    //     })
    // }
    
    // function updateData(queryBody, paramType, paramIndex) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.update({
    //             index: indexDict[paramIndex],
    //             type: indexDict[paramType],
    //             id: queryBody.id,
    //             body: queryBody.body
    //         }).then((result) => {
    //             log.info('Results: ' + result);
    //             return new Promise((resolve1,reject1) =>{
    //                 elasticSearchClient.indices.flush(
    //                     {
    //                         index: [indexDict["postIndex"], indexDict['threadIndex'], indexDict["userpostactivityIndex"], indexDict["hashtagsIndex"]],
    //                         wait_if_ongoing: false
    //                     }
    //                 )
    //                 .then(result1=>{
    //                     log.info('Results: ' + result1);
    //                     resolve(result)
    //                 })
    //                 .catch((err1) =>{
    //                     log.error('error: ' + err1);
    //                     reject(err1)
    //                 })
    //             })
    //         }).catch((err) => {
    //             log.error('error: ' + err);
    //             reject(result)
    //         })
    //     })
    // }
    
    // function updateDataByQuery(queryBody, paramType, paramIndex) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.updateByQuery({
    //             index: paramIndex,
    //             type: paramType,
    //             body: queryBody
    //         }).then((result) => {
    //             log.info('Result :' + result);
    //             return new Promise((resolve1,reject1) =>{
    //                 elasticSearchClient.indices.flush(
    //                     {
    //                         index: [indexDict["postIndex"], indexDict['threadIndex'], indexDict["userpostactivityIndex"], indexDict["hashtagsIndex"]],
    //                         wait_if_ongoing: false
    //                     }
    //                 )
    //                 .then(result1=>{
    //                     log.info('Results: ' + result1);
    //                     resolve(result)
    //                 })
    //                 .catch((err1) =>{
    //                     log.error('error: ' + err1);
    //                     reject(err1)
    //                 })
    //             })
    //         }).catch((err) => {
    //             log.error('error: ' + err);
    //             reject(result)
    //         })
    //     })
    // }
    
    // function bulkData(queryBody) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.bulk({
    //             body: queryBody
    //         })
    //             .then((result) => {
    //                 log.info('Results: ' + result);
    //                 return new Promise((resolve1,reject1) =>{
    //                     elasticSearchClient.indices.flush(
    //                         {
    //                             index: [indexDict["postIndex"], indexDict['threadIndex'], indexDict["userpostactivityIndex"], indexDict["hashtagsIndex"]],
    //                             wait_if_ongoing: false
    //                         }
    //                     )
    //                     .then(result1=>{
    //                         log.info('Results: ' + result1);
    //                         resolve(result)
    //                     })
    //                     .catch((err1) =>{
    //                         log.error('error: ' + err1);
    //                         reject(err1)
    //                     })
    //                 })
    //             }).catch((err) => {
    //                 log.error('error: ' + err);
    //                 reject(result)
    //             })
    //     })
    // }
    
    // function deleteData(deleteId, paramType, paramIndex) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.delete({
    //             index: indexDict[paramIndex],
    //             type: indexDict[paramType],
    //             id: deleteId,
    //         }).then((result) => {
    //             log.info('Results: ' + result);
    //             return new Promise((resolve1,reject1) =>{
    //                 elasticSearchClient.indices.flush(
    //                     {
    //                         index: [indexDict["postIndex"], indexDict['threadIndex'], indexDict["userpostactivityIndex"], indexDict["hashtagsIndex"]],
    //                         wait_if_ongoing: false
    //                     }
    //                 )
    //                 .then(result1=>{
    //                     log.info('Results: ' + result1);
    //                     resolve(result)
    //                 })
    //                 .catch((err1) =>{
    //                     log.error('error: ' + err1);
    //                     reject(err1)
    //                 })
    //             })
    //         }).catch((err) => {
    //             log.error('error: ' + err);
    //             reject(result)
    //         })
    //     })
    // }
    
    // function templateSearch(queryBody, paramType, paramIndex, paramsTemplate) {
    //     if (elasticSearchClient == null) {
    //         connectClient();
    //     }
    //     paramIndexList = paramIndex.split(',')
    //     indexNamesList = []
    //     paramIndexList.forEach(element => {
    //         indexNamesList.push(indexDict[element])
    //     });
    //     indexNames = indexNamesList.join(',')
    //     console.log(indexNames)
    //     return new Promise((resolve, reject) => {
    //         elasticSearchClient.searchTemplate({
    //             index: indexNames,
    //             type: indexDict[paramType],
    //             body: {
    //                 "id": indexDict[paramsTemplate],
    //                 "params": queryBody
    //             }
    //         }).then((result) => {
    //             log.info('Results: ' + result);
    //             resolve(result)
    //         }).catch((err) => {
    //             log.error('error: ' + err);
    //             reject(result)
    //         })
    //     })
    // }
    
    
    module.exports = {
        getData,
        demo
        // createData,
        // updateData,
        // deleteData,
        // updateDataByQuery,
        // templateSearch,
        // bulkData,
        
    };
}