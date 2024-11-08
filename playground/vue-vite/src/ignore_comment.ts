try {
  throw new Error('ignore comment')
}
catch (err) {
  // test
}
/*! @ignore_catch_throw */
try {
  throw new Error('ignore comment')
}
catch (err) {
  // test
}

try {
  throw new Error('ignore comment')
}
catch (err) {
  /*! @ignore_catch_throw */
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p1 rejected'))
  })
}).catch(() => {
  /*! @ignore_catch_throw */
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p2 rejected'))
  })
})

const p2_1 = p2
p2_1.catch(() => {
  /*! @ignore_catch_throw */
})
const p2_2 = p2
p2_2.catch(() => {
  /*! @ignore_catch_throw */
})
const p2_3 = p2_2
p2_3.catch(() => {
  /*! @ignore_catch_throw */
})

// 函数定义
function proFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('proFn rejected'))
    })
  })
}
proFn().catch(() => {
  /*! @ignore_catch_throw */
})

const proFnConst = proFn
proFnConst().catch(() => {
  /*! @ignore_catch_throw */
})

// 箭头函数
const proFn2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('proFn rejected'))
    })
  })
}
proFn2().catch(() => {
  /*! @ignore_catch_throw */
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p3 rejected'))
  })
})

// async/await
const proFn3 = async () => {
  return await p3
}
proFn3().catch(() => {
  /*! @ignore_catch_throw */
})

async function asycnFn() {
  try {
    await p3
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {
    /*! @ignore_catch_throw */
  }
}
asycnFn()

class TestCatch {
  private resolve = () => {}
  private reject = () => {}
  catch(fn: (resolve: any, reject: any) => void) {
    setTimeout(() => {
      fn(this.resolve, this.reject)
    })
  }
}
const test = new TestCatch()
test.catch(() => {})

function testProFn() {
  return { catch: (fn: () => void) => {
    fn()
  } }
}
testProFn().catch(() => {})
