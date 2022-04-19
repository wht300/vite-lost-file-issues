import { fileURLToPath } from 'url';
import WindiCSS from 'vite-plugin-windicss';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport, { ElementPlusResolve } from 'vite-plugin-style-import';
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const ENV = loadEnv(mode, process.cwd());
  return defineConfig({
    base: `/${ENV.VITE_BASE_URL}/`,
    plugins: [
      vue(),
      vueJsx(),
      styleImport({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style/less.js`,
          },
        ],
      }),
      WindiCSS(),
      legacy({
        targets: ['Chrome >= 39'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2015',
    },
  });
};
