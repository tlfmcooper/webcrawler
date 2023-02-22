const {JSDOM} = require('jsdom');


async function crawlPage(url) {

    try{
        const response = await fetch(url);
        if (response.status > 399) {
            console.log(`Error in trying to fecth ${url}: ${response.status}`);
            return;
        
        }

        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`Non html response content type ${contentType} while getting: ${url}`);
            return;
        }
    }
    catch(err) {
        console.log(`Error in trying to fecth ${url}: ${err.message}`);
        return;
    }

    console.log(`Crawling page ${url}`);
    
    //console.log(`Response text: ${response.text()}`);
    return response.text();
    
}

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
    normalizeUrl, getURLsFromHTML, crawlPage
    
    
}
