import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Select } from '@shared/UIkit/select/Select';
import { ISelectProps } from '@shared/UIkit/select/select.interface';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
  { value: 'viewer', label: 'Viewer' },
];

const ControlledSelect: FC<ISelectProps> = (args) => {
  const [
    value,
    setValue,
  ] = useState(args.value ?? '');

  return (
    <Select
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

const meta: Meta<ISelectProps> = {
  title: 'UIkit/Select',
  component: Select,
  args: {
    label: 'Role',
    value: '',
    options: ROLE_OPTIONS,
    placeholder: ' ',
    required: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<ISelectProps>;

const narrowContainer = { width: 320 };

export const Default: Story = {
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledSelect {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Role',
    value: '',
    options: ROLE_OPTIONS,
    placeholder: ' ',
    error: 'Role is required.',
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledSelect {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    label: 'Role',
    value: 'member',
    options: ROLE_OPTIONS,
    placeholder: ' ',
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledSelect {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: 'admin',
    options: ROLE_OPTIONS,
    disabled: true,
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledSelect {...args} />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    options: ROLE_OPTIONS,
    placeholder: 'Select role',
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledSelect {...args} />
    </div>
  ),
};
