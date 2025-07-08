// 参考文档
import path from 'path';
import { menus } from './hooks'

// https://v1.d.umijs.org/zh-CN/config#mode
export default {
  exportStatic: {},
  nodeModulesTransform: {
    type: 'none', // all
    exclude: [],
  },
  publicPath: '/react-project/',
  history: {
    type: 'hash',
  },
  //   配置额外的babel插件
  extraBabelPlugins: [
    [
      'babel-plugin-import', // 按需引入
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  mode: 'site',
  title: 'QingSong React Hooks',
  dynamicImport: {},
  manifest: {},
  hash: true,
  alias: {
    'qingsong-hooks': path.resolve(__dirname, '../packages/hooks/src/index.ts'),
  },
  resolve: {
    includes: ['docs', 'packages/hooks/src'],
  },
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: 'Hooks',
      path: '/hooks',
    },
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/guide': [
      {
        title: '指南',
        path: '/guide',
      },
    ],
    '/hooks': menus,
  },
}
