import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  resolve: {
    alias: {
      dom: './jsx-runtime.js',
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
