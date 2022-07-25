function templateSearch(queryBody, paramType, paramIndex, paramsTemplate) {
    if (elasticSearchClient == null) {
        connectClient();
    }
    paramIndexList = paramIndex.split(',')
    indexNamesList = []
    paramIndexList.forEach(element => {
        indexNamesList.push(indexDict[element])
    });
    indexNames = indexNamesList.join(',')
    console.log(indexNames)
    return new Promise((resolve, reject) => {
        elasticSearchClient.searchTemplate({
            index: indexNames,
            body: {
                "id": indexDict[paramsTemplate],
                "params": queryBody
            }
        }).then((result) => {
            log.info('Results: ' + result);
            resolve(result)
        }).catch((err) => {
            log.error('error: ' + err);
            reject(result)
        })
    })
}





async function searchv1(request, pageNo, pageSize) {
    try {
        // let esType = "searchType"
        let esIndex = "searchIndex"
        let esTemplate = "searchTemplate"
        // let indexNames = ''
        let params = {}
        params.from = pageNo * pageSize
        params.size = pageSize
        // let accessPaths = []
        let idList = []
        let searchData = []
        let totalHits = 0
        let result = {}
        let searchFilterAggs = []

        // accessPaths = await timelineUtilServices.getAccessPaths(request.userId, request.rootOrg)

        // //adding source filter to avoid discussion forum contents
        // params.filtersourceName = true
        // params.filtersourceNameValue = ["Social"]


        // // if accessPath is provided as a filter, checking if the user is having access to those access paths
        // if(request.hasOwnProperty("filters")== true && request.filters.hasOwnProperty("accessPaths")==true && request.filters.accessPaths.length>0){
        //     finalList = []
        //     accessPaths.forEach(e1 => request.filters.accessPaths.forEach(e2 => {
        //         if (e1 == e2) {
        //             finalList.push(e1)
        //         }
        //     })
        //     );
        //     accessPaths = finalList
        //     delete request.filters.accessPaths
        // }
        // if (accessPaths.length == 0) {
        //     throw { statuscode: 404, err: "Access Restricted", message: "Access Restricted" }
        // }

        /*
        if end user search for 'all' -> both should block and must block should be ignored. 
        All the optional filters in the filter query should be ignored
        The landing page or first search will not be having any filters
        */

        //if status filter is not present or null or empty, status should be considered as active
        if(request.hasOwnProperty("filters") == false || request.filters.hasOwnProperty('status') == false && (request.filters.status == null || request.filters.status == "")){
            params.statusValue = 'Active'
        }
        else {
            params.statusValue = request.status
        }
        //console.log("*****")
        //console.log(params)
        // params.rootOrgValue = request.rootOrg
        // params.orgValue = request.org
        // params.postKindValue = request.postKind
        // if (request.postKind == "Blog") {
        //     params.upVoteCountFactor = 0
            // params.answerCountFactor = 1.2
            // params.likesFactor = 1.2
        //     params.replyCountFactor = 1.2
        //     params.likeCountFactor = 1.2
        // }
        if (request.postKind == "Query") {
            params.upVoteCountFactor = 1.2
            // params.answerCountFactor = 1.2
            // params.likesFactor = 0
            params.replyCountFactor = 1.2
            params.likeCountFactor = 0
        }

        //setting the lang properties
        // if (request.hasOwnProperty('locale') == true && request.locale != null && request.locale.length>0) {
        //     indexNamesList = []
        //     request.locale.forEach(element => {
        //         indexValue = esIndex + "_" + element.toLowerCase()
        //         indexNamesList.push(indexValue)
        //     });
        //     indexNames = indexNamesList.join(',')      
        //     //console.log("esIndex" , esIndex)
        // }
        // else {
        //     esIndex = esIndex + "_en"
        // }




        //if date filter is provided,
        if(request.hasOwnProperty("filters")== true && request.filters.hasOwnProperty("dtLastModified")==true && request.filters.dtLastModified.length>0){
            params.filterdtLastModifiedgteValue = request.filters.dtLastModified[0]["from"]
            params.filterdtLastModifiedltValue = request.filters.dtLastModified[0]["to"]
            delete request.filters.dtLastModified
        }
        else {
            params.filterdtLastModifiedgteValue = 0
            params.filterdtLastModifiedltValue = request.sessionId
        }
        params.filteraccessPathsValue = accessPaths
        if (request.query.toLowerCase() != 'all') {
            params.must = true

            if (validate(request.query, 1)) {
                params.mustId = true
                params.should = false
            }
            //check for phrase search
            else if (request.query.match("\".*\"")) {
                params.should = false
            }
            else {
                params.should = true
            }
            params.searchTerm = request.query
        }

        if (request.hasOwnProperty('filters') == true && Object.keys(request.filters.length > 0)) {
            //console.log("in if")
            for (var key in request.filters) {
                //console.log("key : ",key)
                if(request.filters[key].length >0){
                    params = generateFilterStructure(params,key,request.filters[key])
                }
            }
        }

        //generating sort filters
        if (request.hasOwnProperty('sort') == true && Object.keys(request.sort.length > 0)) {
            params.sort = true
            params.sortValue = request.sort
        }

        //console.log(params)
        let searchResult = await esdb.templateSearch(params, esType, indexNames, esTemplate)
        //console.log(searchResult)
        searchHits = searchResult["hits"]

        //console.log("searchHits : ",searchHits)
        if (searchHits["total"] > 0 && searchHits['hits'].length > 0) {
            totalHits = searchHits["total"]
            //console.log(totalHits)
            sourceData = searchHits['hits']
            for(let data of sourceData){
                highLightsMeta = data['highlight'] ? data['highlight'] :[]
                data = data["_source"]
                //console.log(data['id'])
                data['highlight'] = highLightsMeta
                //console.log(data['highlight'])
                searchData.push(data)
                idList.push(data['id'])
                //let replies = data["reply"]
                //console.log("replies : ",replies)
                // for(let reply of replies){
                //     //console.log(reply)
                //     idList.push(reply["id"])
                // }
            }
            //console.log("idList : ",idList )
             //fetching post activities and users activities on the post
             if(idList.length>0){
                 activityObject = {
                     userId : request.userId,
                     rootOrg : request.rootOrg,
                     org : request.org,
                     postId : idList
                 }
                 let activityResult = await timelineUtilServices.fetchActivity(activityObject)
                 searchData.forEach(element => {
                     element.activity = activityResult.get(element["id"])
                 });
             }

            //aggegrations or filters
            //console.log("aggss")
            searchAggs = searchResult['aggregations']['TotalAggs']
            searchFilterAggs = timelineUtilServices.aggegrationsData(searchAggs)

            
        }
        result = {
            "total" : totalHits,
            "result" : searchData,
            "filters" : searchFilterAggs
        }
        return result
        //console.log(params)
    } catch (error) {
        if (error.statuscode) {
            throw error
        }
        else {
            log.error("Unexpected error : ", JSON.stringify(error))
            throw { statuscode: 500, err: "internal server error", message: "unexpected error" }
        }
    }
}