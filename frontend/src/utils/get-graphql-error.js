
const getGraphQLError = res => {
    
    return res.graphQLErrors.map(err =>  err.message)[0];
         
} 

module.exports = {
    getGraphQLError
}