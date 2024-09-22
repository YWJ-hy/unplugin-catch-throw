import MagicString from 'magic-string'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import type { Binding } from '@babel/traverse'

// @ts-ignore
const _traverse = (
  typeof traverse === 'function' ? traverse : (traverse as any).default
) as typeof traverse

// 递归查找变量绑定，直到找到 new Promise 或者找不到绑定
function findPromiseInitialization(binding?: Binding) {
  if (!binding || !t.isVariableDeclarator(binding.path.node))
    return false

  const init = binding.path.node.init
  if (t.isNewExpression(init) && t.isIdentifier(init.callee, { name: 'Promise' })) {
    return true
  }

  if (t.isIdentifier(init)) {
    const nextBinding = binding.scope.getBinding(init.name)
    return findPromiseInitialization(nextBinding)
  }

  return false
}

export function transform(code: string, id: string) {
  const s = new MagicString(code)

  // 解析代码为 AST
  const ast = parse(code, {
    sourceType: 'unambiguous',
    sourceFilename: id,
  })

  // 遍历 AST 树
  _traverse(ast, {
    CatchClause(path) {
      const param = path.node.param
      let paramName = t.isIdentifier(param) ? param.name : ''
      const start = path.node.body.start

      // 如果 catch 没有定义参数，主动定义一个参数名
      if (!paramName && (start || start === 0)) {
        paramName = path.scope.generateUid('e')
        s.appendLeft(start - 1, `(${paramName})`) // 在 catch 的块体开始处插入参数
      }

      // 在 catch 块的第一行插入 Promise.reject
      if (paramName && (start || start === 0)) {
        s.appendLeft(start + 1, `Promise.reject(${paramName});`)
      }
    },

    CallExpression(path) {
      const { callee } = path.node

      // 处理 Promise.catch 情况
      if (
        t.isMemberExpression(callee)
        && t.isIdentifier(callee.property, { name: 'catch' })
        && path.node.arguments.length > 0
      ) {
        let object = callee.object

        const isPromiseCall = (() => {
          // 判断是否new Promise().catch()
          if (t.isCallExpression(object)) {
            const _callee = object.callee
            const isTrue
                  = t.isMemberExpression(_callee)
                  && t.isNewExpression(_callee.object)
                  && t.isIdentifier(_callee.object.callee, { name: 'Promise' })
            if (isTrue)
              return isTrue
          }
          // 判断是否new Promise()赋值给变量，然后变量.catch()
          if (t.isCallExpression(object) && t.isMemberExpression(object.callee)) {
            object = object.callee.object
            const binding = t.isIdentifier(object) && path.scope.getBinding(object.name)
            return binding ? findPromiseInitialization(binding) : false
          }
          return false
        })()

        if (isPromiseCall) {
          const catchArg = path.node.arguments[0]

          if (t.isFunctionExpression(catchArg) || t.isArrowFunctionExpression(catchArg)) {
            const param = catchArg.params[0]
            let paramName = t.isIdentifier(param) ? param.name : ''
            const paramStart = catchArg.start
            const bodyStart = catchArg.body.start

            if (!paramName && (paramStart || paramStart === 0)) {
              paramName = path.scope.generateUid('e')
              s.prependLeft(paramStart + 1, paramName)
            }

            // 在 catch 块的第一行插入 Promise.reject
            if (paramName && (bodyStart || bodyStart === 0)) {
              s.appendLeft(bodyStart + 1, `Promise.reject(${paramName});`)
            }
          }
        }
      }
    },
  })

  return {
    code: s.toString(),
    map: s.generateMap({ source: id, hires: true }), // 如果需要 source map
  }
}