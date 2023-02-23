const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
  // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }
  
  const normalizedURL = normalizeURL(currentURL)

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }

  // initialize this page in the map
  // since it doesn't exist yet
  pages[normalizedURL] = 1

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL)
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
}

function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}

function normalizeURL(url){
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML
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

    if (urlString[-1]===('/')) {
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
