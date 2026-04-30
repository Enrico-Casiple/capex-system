import { BasicInformation, Request, Role, User } from '@/lib/generated/api/customHookAPI/graphql';
import { capexRequest } from './capexRequest.config';
import { role } from './role.config';
import { createTableConfig, ListConfigItem } from './shared';
import { user } from './user.config';
import { WorkFlowTemplate } from '../../../lib/generated/api/customHookAPI/graphql';
import { workFlowTemplate } from './workTemplate.config';
import { basicInformation } from './basicinformation.config';

type ListConfigMap = {
  user: ListConfigItem<User>;
  role: ListConfigItem<Role>;
  capexRequest: ListConfigItem<Request>;
  workFlowTemplate: ListConfigItem<WorkFlowTemplate>
  basicInformation: ListConfigItem<BasicInformation>;
  // permission: ListConfigItem<Record<string, unknown>>;
};

export const listConfig = {
  user: user,
  role: role,
  capexRequest: capexRequest,
  workFlowTemplate: workFlowTemplate,
  basicInformation: basicInformation,
} satisfies ListConfigMap;

export const userTableConfig = createTableConfig<User>(listConfig.user);
export const roleTableConfig = createTableConfig<Role>(listConfig.role);
export const capexRequestTableConfig = createTableConfig<Request>(listConfig.capexRequest);
export const workFlowTemplateTableConfig = createTableConfig<WorkFlowTemplate>(listConfig.workFlowTemplate);
export const basicInformationTableConfig = createTableConfig<BasicInformation>(listConfig.basicInformation);
