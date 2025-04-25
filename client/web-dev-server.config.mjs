// Copyright 2025 LearnChef3000

import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';

const replace = fromRollup(rollupReplace);
const hmr = process.argv.includes('--hmr');

export default {
  open: '/',
  watch: !hmr,
  port: 8081,
  rootDir: '.',
  basePath: '/',
  appIndex: 'index.html',
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    replace({
      include: ['src/utils/config.js'],
      preventAssignment: false,
      __api_url__: (process.env.API_URL || 'http://localhost:8000') + '/api',
      __purchase_mode__: process.env.LEARNCHEF_PURCHASE_MODE || 'buynow',
      __version__: process.env.npm_package_version,
    }),
  ],
};
