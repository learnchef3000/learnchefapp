// Copyright 2025 LearnChef3000

import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: '404.html',
    output: { dir: 'dist' },
    plugins: [html()],
  },
  {
    input: 'index.html',
    output: {
      entryFileNames: '[hash].js',
      chunkFileNames: '[hash].js',
      assetFileNames: '[hash][extname]',
      format: 'es',
      dir: 'dist',
    },
    preserveEntrySignatures: false,

    plugins: [
      /** Replace API URL with written API, linked to Firebase */
      replace({
        include: ['src/utils/config.js'],
        preventAssignment: false,
        __api_url__: '/api', // set in firebase.json
        __purchase_mode__: process.env.LEARNCHEF_PURCHASE_MODE || 'buynow',
        __version__: process.env.npm_package_version,
      }),
      /** Enable using HTML as rollup entrypoint */
      html({
        minify: true,
      }),
      /** Resolve bare module imports */
      nodeResolve(),
      /** Minify JS */
      terser(),
      /** Bundle assets references via import.meta.url */
      importMetaAssets(),
      /** Compile JS to a lower language target */
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: [
                'last 3 Chrome major versions',
                'last 3 Firefox major versions',
                'last 3 Edge major versions',
                'last 3 Safari major versions',
              ],
              modules: false,
              bugfixes: true,
            },
          ],
        ],
        plugins: [
          [
            'babel-plugin-template-html-minifier',
            {
              modules: {
                lit: ['html', { name: 'css', encapsulation: 'style' }],
              },
              failOnError: false,
              strictCSS: true,
              htmlMinifier: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                caseSensitive: true,
                minifyCSS: true,
              },
            },
          ],
        ],
      }),
    ],
  },
];
