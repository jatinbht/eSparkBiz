function validatePageNumber(pageNumber, pageCount) {
    let toRedirect = false
    if (!Number(pageNumber)) {
        pageNumber = 1;
        toRedirect = true
    }
    console.debug('pageNumber: ', pageNumber, 'pageCount', pageCount)
    if (pageNumber > pageCount) {
        pageNumber = pageCount;
        toRedirect = true
    }
    console.debug(pageNumber, toRedirect)
    return {pageNumber, toRedirect}
}

function getPageCount(applicantsCount, applicantsPerPage){
    const pageCount = applicantsCount / applicantsPerPage;
    return pageCount
}

function normalizeQuery(query){
    const a = query.split('!')
    //note: assumption: order that query will be received: !@#$%^&*
    const b = a[a.length - 1].split('@')
    console.log(b)
    return b

}

function getConditionForQueryBuilder(){
    return ' OR' //TODO: take from req.query. AND/OR should be returned based on condition
}

export { validatePageNumber, getPageCount, normalizeQuery, getConditionForQueryBuilder };
