import { defineConfig } from 'rollup'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import swcPkg from 'rollup-plugin-swc'

import { readFileSync } from 'fs'

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString()
)

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const { default: swc } = swcPkg

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      }
    ],
    external: [
      'react',
      'react-dom',
      'next',
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions }),
      commonjs(),
      postcss({
        modules: true,
        use: [
          ['sass', {
            silenceDeprecations: ['legacy-js-api'],
          }]
        ],
        extract: 'styles.css',
        minimize: true,
        
      }),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2018',
        },
        sourceMaps: true,
        minify: true,
      }),
    ],
  }
])

export default config
