import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';

installGlobals();

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/webapp',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    nxViteTsPaths(),
    remix({
      ignoredRouteFiles: ['**/.*'],
      ssr: false
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
