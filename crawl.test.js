const {normalizeUrl} = require('./crawl.js')
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