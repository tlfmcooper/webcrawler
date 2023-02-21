function normalizeUrl(urlString) {

    if (urlString.endsWith('/')) {

        //urlString = urlString.substr(0, urlString.length-1);
        urlString = urlString.slice(0,-1);


    }
    
    urlString = new URL(urlString);
    //urlString = urlString.slice(8)

    
    return `${urlString.hostname}${urlString.pathname}`;
    
}




module.exports = {
    normalizeUrl
}
