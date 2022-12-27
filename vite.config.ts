import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  resolve: {
    alias: {
      dom: './jsx-runtime.js',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: new URL('./index.html', import.meta.url).pathname,
        isef: new URL('./isef.html', import.meta.url).pathname,
      },
    },
  },
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['babel-plugin-jsx-dom-expressions'],
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
