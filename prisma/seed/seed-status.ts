import {prisma} from '../../lib/prisma/prisma'


const data = [
  {
    name: "Pending",
    isActive: true,
    modelNameType: "RequestItemStatus",
  },
  {
    name: "Verified",
    isActive: true,
    modelNameType: "RequestItemStatus",
  },
  {
    name: "Purchased Ordered Created",
    isActive: true,
    modelNameType: "RequestItemStatus",
  },
  {
    name: "For Finance Review",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "Return From Finance Review",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "For Approval",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "Pending For Approval",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "Returned",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "Approved",
    isActive: true,
    modelNameType: "RequestStatus",
  },
  {
    name: "Verified By Finance",
    isActive: true,
    modelNameType: "BudgetStatus",
  },
  {
    name: "For Approval",
    isActive: true,
    modelNameType: "BudgetStatus",
  },
  {
    name: "Pending For Approval",
    isActive: true,
    modelNameType: "BudgetStatus",
  },
  {
    name: "Approved",
    isActive: true,
    modelNameType: "BudgetStatus",
  },
  {
    name: "Rejected",
    isActive: true,
    modelNameType: "BudgetStatus",
  },
  {
    name: "Draft",
    isActive: true,
    modelNameType: "WorkFlowInstanceStatus",
  },
  {
    name: "On-going",
    isActive: true,
    modelNameType: "WorkFlowInstanceStatus",
  },
  {
    name: "Approved",
    isActive: true,
    modelNameType: "WorkFlowInstanceStatus",
  },
  {
    name: "Pending",
    isActive: true,
    modelNameType: "WorkFlowInstanceStepStatus",
  },
  {
    name: "Approved",
    isActive: true,
    modelNameType: "WorkFlowInstanceStepStatus",
  },
  {
    name: "Rejected",
    isActive: true,
    modelNameType: "WorkFlowInstanceStepStatus",
  }
];

const seed = async () => {
  for (const datas of data) {

    await prisma.status.create({
      data: {
        ...datas,
        auditLogs: {
          create: {
            modelName: 'Status',
            action: 'CREATE',
            timestamp: new Date(),
            newDetails: JSON.stringify(datas),
          }
        }
      },
    });

  }
}

seed()
  .then(() => {
    console.log('\n🎉 Status seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Status seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

