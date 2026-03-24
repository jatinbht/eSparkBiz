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

function getPageCount (applicantsCount, applicantsPerPage){
    const pageCount = applicantsCount / applicantsPerPage;
    return pageCount
}

export { validatePageNumber, getPageCount };
