<script setup lang="ts">
import './catch'

// eslint-disable-next-line unused-imports/no-unused-vars
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p1 rejected'))
  })
}).catch(() => {})

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

// 函数定义
function proFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('proFn rejected'))
    })
  })
}
proFn().catch(() => {})

const proFnConst = proFn
proFnConst().catch(() => {})

// 箭头函数
const proFn2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('proFn rejected'))
    })
  })
}
proFn2().catch(() => {})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('p3 rejected'))
  })
})

// async/await
const proFn3 = async () => {
  return await p3
}
proFn3().catch(() => {})

async function asycnFn() {
  try {
    await p3
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (err) {

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
</script>

<template>
  <header>
    unplugin-catch-throw
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
