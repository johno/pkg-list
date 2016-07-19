import test from 'ava'
import pkgList from './'

test.cb('pkg-list returns an object with a count and items', t => {
  t.plan(3)

  pkgList('johno')
    .then(res => {
      t.truthy(res)
      t.true(res.count > 200)
      t.true(res.count == res.items.length)
      t.end()
    })
    .catch(err => {
      console.error(err)
      t.fail()
      t.end()
    })
})
