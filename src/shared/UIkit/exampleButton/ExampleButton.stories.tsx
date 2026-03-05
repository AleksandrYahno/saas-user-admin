import type { Meta, StoryObj } from '@storybook/react';

import { ExampleButton, type IExampleButtonProps } from './ExampleButton';

const meta: Meta<IExampleButtonProps> = {
  title: 'UIkit/ExampleButton',
  component: ExampleButton,
  args: {
    label: 'Click me',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<IExampleButtonProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

