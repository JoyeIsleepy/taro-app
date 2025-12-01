import { defineConfig } from '@tarojs/cli';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

import devConfig from './dev';
import prodConfig from './prod';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'taro-app',
    date: '2025-11-21',
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1,
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-generator', '@tarojs/plugin-html'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: {
      type: 'vite',
      vitePlugins: [
        vitePluginImp({
          libList: [
            {
              libName: '@nutui/nutui-react-taro',
              style: name => {
                // 按需引入 css 文件的处理，两种方式择其一
                return `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style/style.css`;
              },
              replaceOldImport: false,
              camel2DashComponentName: false,
            },
          ],
        }),
      ],
    },
    sass: {
      resource: [
        'node_modules/@nutui/nutui-react-taro/dist/styles/variables.scss',
        'src/styles/mixins.scss',
      ],
      projectDirectory: process.cwd(),
    },
    url: {
      enable: true,
      config: {
        limit: 10240, // 10KB 以下图片自动转 Base64
      },
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        miniCssExtractPluginOption: {
          ignoreOrder: true,
          filename: 'css/[name].[hash].css',
          chunkFilename: 'css/[name].[chunkhash].css',
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'assets',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
