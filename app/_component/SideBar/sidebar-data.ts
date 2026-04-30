// components/SideBar/sidebar-data.ts
import { Users, Shield, LucideIcon, Building2Icon } from 'lucide-react';
import {MODEL_CASE_MAP} from '../../../generated/model-names';

export interface SidebarItem {
  title: string;
  url: string;
  isActive?: boolean;
  badge?: string | number;
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
  items?: SidebarItem[]; // 👈 recursive — this was missing
}

export interface SidebarSection {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SidebarItem[];
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
}

export interface SidebarProject {
  name: string;
  url: string;
  icon: LucideIcon;
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
}

export interface SidebarSecondaryItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const genericNaming = (modelName: string) => {
  return `${modelName}_MANAGEMENT`;
}

export const sidebarData: {
  navMain: SidebarSection[];
} = {
  navMain: [
    {
      title: 'User Management',
      url: '/user',
      icon: Users,
      permission: { module: genericNaming(MODEL_CASE_MAP['User'].uppercase), resource: MODEL_CASE_MAP['User'].toLower, action: 'read' },
      items: [
        {
          title: 'All Users',
          url: '/user',
          permission: { module: genericNaming(MODEL_CASE_MAP['User'].uppercase), resource: MODEL_CASE_MAP['User'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["BasicInformation"].properCase,
          url: `/user/${MODEL_CASE_MAP["BasicInformation"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["BasicInformation"].uppercase), resource: MODEL_CASE_MAP['BasicInformation'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["WorkInformation"].properCase,
          url: `/user/${MODEL_CASE_MAP["WorkInformation"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkInformation"].uppercase), resource: MODEL_CASE_MAP['WorkInformation'].toLower, action: 'read' },
        },
      ],
    },
    {
      title: 'Role Management',
      url: `/${MODEL_CASE_MAP["Role"].toLower}`,
      icon: Shield,
      permission: { module: genericNaming(MODEL_CASE_MAP["Role"].uppercase), resource: MODEL_CASE_MAP['Role'].toLower, action: 'read' },
      items: [
         {
          title: MODEL_CASE_MAP["Role"].properCase,
          url: `/role/${MODEL_CASE_MAP["Role"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Role"].uppercase), resource: MODEL_CASE_MAP['Role'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["Permission"].properCase,
          url: `/role/${MODEL_CASE_MAP["Permission"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Permission"].uppercase), resource: MODEL_CASE_MAP['Permission'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["RolePermission"].properCase,
          url: `/role/${MODEL_CASE_MAP["RolePermission"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["RolePermission"].uppercase), resource: MODEL_CASE_MAP['RolePermission'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["UserRole"].properCase,
          url: `/role/${MODEL_CASE_MAP["UserRole"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["UserRole"].uppercase), resource: MODEL_CASE_MAP['UserRole'].toLower, action: 'read' },
        },
      ],
    },
    {
      title: 'Organization Management',
      url: '/organization',
      icon: Building2Icon,
      permission: { module: genericNaming(MODEL_CASE_MAP["GroupOfCompany"].uppercase), resource: MODEL_CASE_MAP['GroupOfCompany'].toLower, action: 'read' },
      items: [
        {
          title: MODEL_CASE_MAP["GroupOfCompany"].properCase,
          url: `/organization/${MODEL_CASE_MAP["GroupOfCompany"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["GroupOfCompany"].uppercase), resource: MODEL_CASE_MAP['GroupOfCompany'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["Company"].properCase,
          url: `/organization/${MODEL_CASE_MAP["Company"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Company"].uppercase), resource: MODEL_CASE_MAP['Company'].toLower, action: 'read' },
        },
                {
          title: MODEL_CASE_MAP["Department"].properCase,
          url: `/organization/${MODEL_CASE_MAP["Department"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Department"].uppercase), resource: MODEL_CASE_MAP['Department'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["Position"].properCase,
          url: `/organization/${MODEL_CASE_MAP["Position"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Position"].uppercase), resource: MODEL_CASE_MAP['Position'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["JobLevel"].properCase,
          url: `/organization/${MODEL_CASE_MAP["JobLevel"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["JobLevel"].uppercase), resource: MODEL_CASE_MAP['JobLevel'].toLower, action: 'read' },
        },
      ],
    },
    {
      title: 'General Management',
      url: '/general',
      icon: Shield,
      permission: { module: genericNaming(MODEL_CASE_MAP["Location"].uppercase), resource: MODEL_CASE_MAP['Location'].toLower, action: 'read' },
      items: [
         {
          title: 'Added Columns',
          url: '/general/added-columns',
          permission: { module: genericNaming(MODEL_CASE_MAP["Location"].uppercase), resource: MODEL_CASE_MAP['Location'].toLower, action: 'read' },
          items: [
            {
              title: MODEL_CASE_MAP["Location"].properCase,
              url: `/${MODEL_CASE_MAP["Location"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Location"].uppercase), resource: MODEL_CASE_MAP['Location'].toLower, action: 'read' },
            },
             {
              title: MODEL_CASE_MAP["ShiftingSchedule"].properCase,
              url: `/${MODEL_CASE_MAP["ShiftingSchedule"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["ShiftingSchedule"].uppercase), resource: MODEL_CASE_MAP['ShiftingSchedule'].toLower, action: 'read' },
            },
             {
              title: MODEL_CASE_MAP["Holiday"].properCase,
              url: `/${MODEL_CASE_MAP["Holiday"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Holiday"].uppercase), resource: MODEL_CASE_MAP['Holiday'].toLower, action: 'read' },
            },
            {
              title: MODEL_CASE_MAP["Signature"].properCase,
              url: `/${MODEL_CASE_MAP["Signature"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Signature"].uppercase), resource: MODEL_CASE_MAP['Signature'].toLower, action: 'read' },
            },
          ],
         },
          {
          title: 'Defaults',
          url: '/general/defaults',
          permission: { module: genericNaming(MODEL_CASE_MAP["Type"].uppercase), resource: MODEL_CASE_MAP['Type'].toLower, action: 'read' },
          items: [
            {
              title: MODEL_CASE_MAP["Type"].properCase,
              url: `/general/${MODEL_CASE_MAP["Type"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Type"].uppercase), resource: MODEL_CASE_MAP['Type'].toLower, action: 'read' },
            },
             {
              title: MODEL_CASE_MAP["Category"].properCase,
              url: `/general/${MODEL_CASE_MAP["Category"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Category"].uppercase), resource: MODEL_CASE_MAP['Category'].toLower, action: 'read' },
            },
             {
              title: MODEL_CASE_MAP["ConfigCondition"].properCase,
              url: `/general/${MODEL_CASE_MAP["ConfigCondition"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["ConfigCondition"].uppercase), resource: MODEL_CASE_MAP['ConfigCondition'].toLower, action: 'read' },
            },
            {
              title: MODEL_CASE_MAP["Config"].properCase,
              url: `/general/${MODEL_CASE_MAP["Config"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Config"].uppercase), resource: MODEL_CASE_MAP['Config'].toLower, action: 'read' },
            },
             {
              title: MODEL_CASE_MAP["Status"].properCase,
              url: `/general/${MODEL_CASE_MAP["Status"].toLower}`,
              permission: { module: genericNaming(MODEL_CASE_MAP["Status"].uppercase), resource: MODEL_CASE_MAP['Status'].toLower, action: 'read' },
            },
          ],
         },
        {
          title: MODEL_CASE_MAP["AuditLog"].properCase,
          url: `/general/${MODEL_CASE_MAP["AuditLog"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["AuditLog"].uppercase), resource: MODEL_CASE_MAP['AuditLog'].toLower, action: 'read' },
        },
         {
          title: MODEL_CASE_MAP["WorkFlowTemplate"].properCase,
          url: `/general/${MODEL_CASE_MAP["WorkFlowTemplate"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkFlowTemplate"].uppercase), resource: MODEL_CASE_MAP['WorkFlowTemplate'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["WorkFlowTemplateScope"].properCase,
          url: `/general/${MODEL_CASE_MAP["WorkFlowTemplateScope"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkFlowTemplateScope"].uppercase), resource: MODEL_CASE_MAP['WorkFlowTemplateScope'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["WorkFlowStepTemplate"].properCase,
          url: `/general/${MODEL_CASE_MAP["WorkFlowStepTemplate"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkFlowStepTemplate"].uppercase), resource: MODEL_CASE_MAP['WorkFlowStepTemplate'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["WorkFlowInstance"].properCase,
          url: `/general/${MODEL_CASE_MAP["WorkFlowInstance"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkFlowInstance"].uppercase), resource: MODEL_CASE_MAP['WorkFlowInstance'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["WorkFlowInstanceStep"].properCase,
          url: `/general/${MODEL_CASE_MAP["WorkFlowInstanceStep"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["WorkFlowInstanceStep"].uppercase), resource: MODEL_CASE_MAP['WorkFlowInstanceStep'].toLower, action: 'read' },
        },
      ],
    },
    {
      title: 'Request Management',
      url: '/request',
      icon: Building2Icon,
      permission: { module: genericNaming(MODEL_CASE_MAP["Request"].uppercase), resource: MODEL_CASE_MAP['Request'].toLower, action: 'read' },
      items: [
        {
          title: MODEL_CASE_MAP["Request"].properCase,
          url: `/request/${MODEL_CASE_MAP["Request"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Request"].uppercase), resource: MODEL_CASE_MAP['Request'].toLower, action: 'read' },
        },
         {
          title: MODEL_CASE_MAP["RequestItem"].properCase,
          url: `/request/${MODEL_CASE_MAP["RequestItem"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["RequestItem"].uppercase), resource: MODEL_CASE_MAP['RequestItem'].toLower, action: 'read' },
        },
         {
          title: MODEL_CASE_MAP["InventoryItem"].properCase,
          url: `/request/${MODEL_CASE_MAP["InventoryItem"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["InventoryItem"].uppercase), resource: MODEL_CASE_MAP['InventoryItem'].toLower, action: 'read' },
        },
      ],
    },
    {
      title: 'Budget Management',
      url: '/budget',
      icon: Building2Icon,
      permission: { module: genericNaming(MODEL_CASE_MAP["CapitalRecoveryFactor"].uppercase), resource: MODEL_CASE_MAP['CapitalRecoveryFactor'].toLower, action: 'read' },
      items: [
        {
          title: MODEL_CASE_MAP["CapitalRecoveryFactor"].properCase,
          url: `/budget/${MODEL_CASE_MAP["CapitalRecoveryFactor"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["CapitalRecoveryFactor"].uppercase), resource: MODEL_CASE_MAP['CapitalRecoveryFactor'].toLower, action: 'read' },
        },
        {
          title: MODEL_CASE_MAP["Budget"].properCase,
          url: `/budget/${MODEL_CASE_MAP["Budget"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["Budget"].uppercase), resource: MODEL_CASE_MAP['Budget'].toLower, action: 'read' },
        },
         {
          title: MODEL_CASE_MAP["BudgetLedger"].properCase,
          url: `/budget/${MODEL_CASE_MAP["BudgetLedger"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["BudgetLedger"].uppercase), resource: MODEL_CASE_MAP['BudgetLedger'].toLower, action: 'read' },
        },
         {
          title: MODEL_CASE_MAP["BudgetSnapshot"].properCase,
          url: `/budget/${MODEL_CASE_MAP["BudgetSnapshot"].toLower}`,
          permission: { module: genericNaming(MODEL_CASE_MAP["BudgetSnapshot"].uppercase), resource: MODEL_CASE_MAP['BudgetSnapshot'].toLower, action: 'read' },
        },
      ],
    },
  ],
};
