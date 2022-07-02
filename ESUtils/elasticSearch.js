const elasticsearch = require('elasticsearch');

let elasticSearchClient=null

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



}





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
    function createEntity(object){
        console.log("Esdb invoked perfectly")
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
