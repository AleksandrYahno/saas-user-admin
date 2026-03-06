export type StatCardVariant = 'blue' | 'green' | 'orange';

export interface IStatCardProps {
  title: string;
  value: string | number;
  variant?: StatCardVariant;
}
