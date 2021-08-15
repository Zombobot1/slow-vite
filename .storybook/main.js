const svgrPlugin = require('vite-plugin-svgr')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config) {
    config.plugins.push(svgrPlugin())
    config.esbuild = {
      ...config.esbuild,
      jsxInject: `import React from 'react'`,
    }
    return config
  },
}
