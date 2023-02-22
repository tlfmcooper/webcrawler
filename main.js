const {crawlPage} = require('./crawl.js');

async function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node " + process.argv[1] + " <url>");
        process.exit(1);
    }

    if(process.argv.length > 3) {
        console.log("Too many arguments");
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log("Reading file " + process.argv[2]);
    const text  = await crawlPage(baseURL);

    console.log(`${text}`);
}

main();