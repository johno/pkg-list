'use strict'

const got = require('got')

const baseUrl = 'https://www.npmjs.com/profile'

module.exports = function pkgList (user) {
  if (typeof user !== 'string') {
    throw new TypeError('pkg-list expected a string')
  }

  let offset = 0
  let count = 0
  let items = []

  return new Promise((resolve, reject) => {
    req(user)
      .then(res => {
        count = res.body.count
        items = items.concat(res.body.items)

        const totalCalls = count/100
        let promises = []

        for (let i = 1; i <= totalCalls; i++) {
          promises.push(req(i))
        }

        Promise.all(promises)
          .then(arr => {
            arr.forEach(a => items = items.concat(a.body.items))
            resolve({ count, items })
          })
          .catch(reject)

      })
      .catch(reject)
  })

  function req (offset, items) {
    const query = offset ? `?offset=${offset}` : ''

    return got.get(`${baseUrl}/${user}/packages${query}`, { json: true })
  }
}
