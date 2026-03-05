import tsconfigPaths from 'vite-tsconfig-paths';

const config = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  async viteFinal(baseConfig) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(baseConfig, {
      plugins: [
        tsconfigPaths(),
      ],
    });
  },
};

export default config;

