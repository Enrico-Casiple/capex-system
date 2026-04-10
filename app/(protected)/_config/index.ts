import { Role, User } from '@/lib/generated/api/customHookAPI/graphql';
import { createTableConfig, ListConfigItem } from './shared';
import { role } from './role.config';
import { user } from './user.config';

type ListConfigMap = {
  user: ListConfigItem<User>;
  role: ListConfigItem<Role>;
  // permission: ListConfigItem<Record<string, unknown>>;
};

export const listConfig = {
  user: user,
  role: role,
} satisfies ListConfigMap;

export const userTableConfig = createTableConfig<User>(listConfig.user);
export const roleTableConfig = createTableConfig<Role>(listConfig.role);
