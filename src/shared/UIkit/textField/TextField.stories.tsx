import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { TextField } from '@shared/UIkit/textField/TextField';
import { ITextFieldProps } from '@shared/UIkit/textField/textField.interface';

const ControlledTextField: FC<ITextFieldProps> = (args) => {
  const [
    value,
    setValue,
  ] = useState(args.value ?? '');

  return (
    <TextField
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

const meta: Meta<ITextFieldProps> = {
  title: 'UIkit/TextField',
  component: TextField,
  args: {
    label: 'Full Name',
    value: '',
    type: 'text',
    required: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;

type Story = StoryObj<ITextFieldProps>;

const narrowContainer = { width: 320 };

export const Default: Story = {
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledTextField {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Full Name',
    value: 'Jo',
    error: 'Full Name must be at least 3 characters.',
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledTextField {...args} />
    </div>
  ),
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledTextField {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: 'Disabled value',
    disabled: true,
  },
  render: (args) => (
    <div style={narrowContainer}>
      <ControlledTextField {...args} />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width field',
  },
  render: (args) => (
    <ControlledTextField {...args} />
  ),
};
