const {normalizeUrl, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol ', () => {

    const input ="https://blog.boot.dev/path"
    const expected ="blog.boot.dev/path"

    const actual = normalizeUrl(input)
    expect(actual).toBe(expected)

})

test('normalizeUrl strip trailing slash ', () => {

    const input ="https://blog.boot.dev/path/"
    const expected ="blog.boot.dev/path"

    const actual = normalizeUrl(input)
    expect(actual).toBe(expected)

})

test('normalizeUrl lower all letters ', () => {

    const input ="https://Blog.boot.dev/path/"
    const expected ="blog.boot.dev/path"

    const actual = normalizeUrl(input)
    expect(actual).toBe(expected)

})


test('normalizeUrl strip http ', () => {

    const input ="https://blog.boot.dev/path/"
    const expected ="blog.boot.dev/path"

    const actual = normalizeUrl(input)
    expect(actual).toBe(expected)

})

test('getURLsFromHTML absolute', () => {

    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path">
                Boot.dev Blog
            </a>
        </body>
    </html>
`;

    const inputBaseUrl ="https://blog.boot.dev/"
    const expected =["https://blog.boot.dev/path"]

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML relative', () => {

    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
`;

    const inputBaseUrl ="https://blog.boot.dev"
    const expected =["https://blog.boot.dev/path/"]

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML absolute relative', () => {

    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog- Section 1
            </a>
            <a href="/path2/">
                Boot.dev Blog - Section 2

            </a>
        </body>
    </html>
`;

    const inputBaseUrl ="https://blog.boot.dev"
    const expected =["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML invalid', () => {

    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev Blog
            </a>
        </body>
    </html>
`;

    const inputBaseUrl ="https://blog.boot.dev"
    const expected =[]

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)

    expect(actual).toEqual(expected)

})