import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'
import { dirname, join } from 'pathe'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    inlineDependencies: true,
    dts: {
      respectExternal: false,
    },
    emitCJS: true,
    output: {
      exports: 'named',
    },
  },
  externals: [],
})
