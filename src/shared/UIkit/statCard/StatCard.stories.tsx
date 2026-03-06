import { Meta, StoryObj } from '@storybook/react';

import { StatCard } from '@shared/UIkit/statCard/StatCard';
import { IStatCardProps } from '@shared/UIkit/statCard/statCard.interface';

const meta: Meta<IStatCardProps> = {
  title: 'UIkit/StatCard',
  component: StatCard,
  args: {
    title: 'Total Users',
    value: '120',
    variant: 'blue',
  },
};

export default meta;

type Story = StoryObj<IStatCardProps>;

export const Blue: Story = {
  args: {
    title: 'Total Users',
    value: '120',
    variant: 'blue',
  },
};

export const Green: Story = {
  args: {
    title: 'Active Users',
    value: '95',
    variant: 'green',
  },
};

export const Orange: Story = {
  args: {
    title: 'Pending Invitations',
    value: '8',
    variant: 'orange',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <StatCard
        title="Total Users"
        value="120"
        variant="blue"
      />
      <StatCard
        title="Active Users"
        value="95"
        variant="green"
      />
      <StatCard
        title="Pending Invitations"
        value="8"
        variant="orange"
      />
    </div>
  ),
};
