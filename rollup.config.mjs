import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default defineConfig({
    input: './src/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        }
    ],
    plugins: [
        commonjs(),
        resolve(),
        json(),
        babel({
            babelHelpers: 'bundled',
            exclude: "node_modules/**"
        }),
        typescript({
            sourceMap: false
        })
    ]
})