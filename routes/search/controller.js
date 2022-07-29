

function generateFilterStructure(params, key, value) {
    try {
        params['filter' + key] = true
        params['filter' + key + 'Value'] = value
    } catch (error) {
        log.error('error', error)
        throw error.toString()
    }
    return params;
}
async function getSearchDetails(body){
     console.log(body)
    try{
        let esType = "searchType"
        let esIndex = "searchIndex"
        let esTemplate = "doctorTemplate"
        let params = {}
        params.from = body.pageNo * body.pageSize
        params.size = body.pageSize



          //generating sort filters
          if (request.hasOwnProperty('sort') == true && Object.keys(request.sort.length > 0)) {
            params.sort = true
            params.sortValue = request.sort
        }
        //processing of Filters
        if (request.hasOwnProperty('filters') == true && Object.keys(request.filters.length > 0)) {
            //console.log("in if")
            for (var key in request.filters) {
                //console.log("key : ",key)
                if(request.filters[key].length >0){
                    params = generateFilterStructure(params,key,request.filters[key])
                }
            }
        }

    }catch(err){}
    
    
}

module.exports={getSearchDetails};