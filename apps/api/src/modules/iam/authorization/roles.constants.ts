export const ROLES = {
  user: 'user',
  editor: 'editor',
  admin: 'admin',
} as const;

export type Roles = (typeof ROLES)[keyof typeof ROLES];
