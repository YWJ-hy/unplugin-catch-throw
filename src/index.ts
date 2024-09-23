import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import { transform } from './core/transform'

export const unpluginFactory: UnpluginFactory<Options | undefined> = ({
  include = [/\.[jt]sx?$/, /\.vue$/],
  exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
} = {}) => {
  // 检测的文件类型范围
  const filter = createFilter(include, exclude)

  return {
    name: 'unplugin-catch-throw',
    transformInclude(id) {
      return filter(id)
    },
    transform(code, id) {
      return transform(code, id)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
