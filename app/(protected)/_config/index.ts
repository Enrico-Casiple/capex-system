import { Request, Role, User } from '@/lib/generated/api/customHookAPI/graphql';
import { capexRequest } from './capexRequest.config.';
import { role } from './role.config';
import { createTableConfig, ListConfigItem } from './shared';
import { user } from './user.config';

type ListConfigMap = {
  user: ListConfigItem<User>;
  role: ListConfigItem<Role>;
  capexRequest: ListConfigItem<Request>;
  // permission: ListConfigItem<Record<string, unknown>>;
};

export const listConfig = {
  user: user,
  role: role,
  capexRequest: capexRequest,
} satisfies ListConfigMap;

export const userTableConfig = createTableConfig<User>(listConfig.user);
export const roleTableConfig = createTableConfig<Role>(listConfig.role);
export const capexRequestTableConfig = createTableConfig<Request>(listConfig.capexRequest);
