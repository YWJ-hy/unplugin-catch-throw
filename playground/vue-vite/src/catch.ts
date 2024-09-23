const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p2 rejected'))
  })
})

const p2_1 = p2
p2_1.catch(() => {})
const p2_2 = p2
p2_2.catch(() => {})
const p2_3 = p2_2
p2_3.catch(() => {})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p3 rejected'))
  })
})
async function asycnFn() {
  try {
    await p3
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {

  }
}
asycnFn()
