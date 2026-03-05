import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@shared/UIkit/button/Button';
import { IButtonProps } from '@shared/UIkit/button/button.interface';

const meta: Meta<IButtonProps> = {
  title: 'UIkit/Button',
  component: Button,
  args: {
    children: 'Submit',
    type: 'button',
    disabled: false,
    variant: 'primary',
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<IButtonProps>;

export const Primary: Story = {};

export const PrimaryFullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};
