/*! @ignore_catch_throw-file */

try {
  throw new Error('ignore comment')
}
catch (err) {
  // test
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p1 rejected'))
  })
}).catch(() => {

})
