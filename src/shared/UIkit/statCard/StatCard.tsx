import { FC, ReactElement } from 'react';

import { IStatCardProps } from '@shared/UIkit/statCard/statCard.interface';

import './StatCard.css';

const StatCard: FC<IStatCardProps> = (props): ReactElement => {
  const { title, value, variant = 'blue' } = props;

  const className = [
    'stat-card',
    `stat-card--${variant}`,
  ].join(' ');

  return (
    <div className={className}>
      <span className="stat-card__title">
        {title}
      </span>

      <span className="stat-card__value">
        {value}
      </span>
    </div>
  );
};

export { StatCard };
