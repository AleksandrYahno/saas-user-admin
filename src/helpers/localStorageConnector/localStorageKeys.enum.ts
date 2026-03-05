export const LSKeys = {
  APP_STATE: 'APP_STATE',
} as const;

export type LSKey = (typeof LSKeys)[keyof typeof LSKeys];
