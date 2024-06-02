const ListService  = async (Reqest, DataModel, Array ) => {

    try{
        let pageNumber = Number(Reqest.params.pageNumber) // extract page number from request
        let perPage = Number(Reqest.params.perPage) // extract page number from request
        let searchText = Reqest.params.searchText   // search text from request
        let userEmail = Reqest.headers.email // user Email

        let skip = (pageNumber-1) * perPage  // calculate nubmer of the items or skip
        let data; 

        if(searchText !=="null"){
            let query = {$or: Array} // create search query
            data = await DataModel.aggregate([
                {$match: {userEmail: userEmail}},
                {$match: query},
                {
                    $facet: {
                        total:[{$count: "count"}],
                        data:[{$skip: skip}, {$limit: perPage}]
                    }
                }
            ])
            
        }   
        else{
            data = await DataModel.aggregate([
                {$match: {userEmail: userEmail}},
                {
                    $facet: {
                        total:[{$count: "count"}],
                        data:[{$skip: skip}, {$limit: perPage}]
                    }
                }
            ])

        }

        return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }
}

module.exports = ListService