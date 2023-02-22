const {JSDOM} = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {

    const urls =[];
    const dom = new JSDOM(htmlBody);
    dom.window.document.querySelectorAll('a').forEach(link => {
        //console.log(link.href);
        if (link.href.startsWith('/'))
        {   //relative url

            try {

                    const urlObj = new URL(baseURL + link.href);
                    urls.push(urlObj.href);
                }
            catch(err)  {
                        console.log(`Error with relative url: ${err.message}`);
                        }
        }
        else{
            //absolute url
           try {
                const urlObj = new URL(link.href);
                urls.push(urlObj.href);
        } catch (err) {
            console.log(`Error with absolute url: ${err.message}`);
        }
        
    }
    })
    return urls
}


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
    normalizeUrl, getURLsFromHTML
    
}
