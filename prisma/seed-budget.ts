

import {prisma} from '../lib/prisma/prisma';

const data = [
  {
    fiscalYear: "June-May",
    budgetRefNo: "2025AB-UI-00001",
    statusBudget: {
      name: "Approved",
      modelNameType: "BudgetStatus"
    },
    company: {
      name: "Unilogix Inc.",
      acronym: "UI",
    },
    department: {
      name: null,
      acronym: null,
    },
    categoryName: {
      name: "Office Equipment",
      acronym: "OES",
      modelNameType: "BudgetCategory"
    },
    requesterId: "69d1ffa81a9eb71e0ac95f2d",
    purpose: "Purchase of new office laptops for development team",
    specs: "Intel i7, 16GB RAM, 512GB SSD, 14-inch display",
    quantity: 10,
    remark: {
      aopPurpose: "Upgrade outdated hardware",
      aopSpecs: "Mid-high range laptops for dev productivity",
      notes: "Priority for Q2 onboarding"
    },
    submittedAt: new Date("2025-06-15T08:30:00.000Z"),

    requestedAmount: 750000,
    approvedAmount: 720000,
    currency: "PHP",

    isActive: true,
  },
  {
    fiscalYear: "June-May",
    budgetRefNo: "2025AB-UI-00001",
    statusBudget: {
      name: "Verified",
      modelNameType: "BudgetStatus"
    },
    company: {
      name: "Unilogix Inc.",
      acronym: "UI",
    },
    department: {
      name: null,
      acronym: null,
    },
    categoryName: {
      name: "Office Equipment",
      acronym: "OES",
      modelNameType: "BudgetCategory"
    },
    requesterId: "69d1ffa81a9eb71e0ac95f2d",
    purpose: "Purchase of new office laptops for development team",
    specs: "Intel i7, 16GB RAM, 512GB SSD, 14-inch display",
    quantity: 10,
    remark: {
      aopPurpose: "Upgrade outdated hardware",
      aopSpecs: "Mid-high range laptops for dev productivity",
      notes: "Priority for Q2 onboarding"
    },
    submittedAt: new Date("2025-06-15T08:30:00.000Z"),

    requestedAmount: 750000,
    approvedAmount: 720000,
    currency: "PHP",

    isActive: true,
  },
  {
    fiscalYear: "June-May",
    budgetRefNo: "2025AB-UI-00001",
    statusBudget: {
      name: "Draft",
      modelNameType: "BudgetStatus"
    },
    company: {
      name: "Unilogix Inc.",
      acronym: "UI",
    },
    department: {
      name: null,
      acronym: null,
    },
    categoryName: {
      name: "Office Equipment",
      acronym: "OES",
      modelNameType: "BudgetCategory"
    },
    requesterId: "69d1ffa81a9eb71e0ac95f2d",
    purpose: "Purchase of new office laptops for development team",
    specs: "Intel i7, 16GB RAM, 512GB SSD, 14-inch display",
    quantity: 10,
    remark: {
      aopPurpose: "Upgrade outdated hardware",
      aopSpecs: "Mid-high range laptops for dev productivity",
      notes: "Priority for Q2 onboarding"
    },
    submittedAt: new Date("2025-06-15T08:30:00.000Z"),

    requestedAmount: 750000,
    approvedAmount: 720000,
    currency: "PHP",

    isActive: true,
  },

]

const seed = async () => {
  for (const datas of data) {
   await prisma.budget.create({
      data: {
        fiscalYear: datas.fiscalYear,
        statusBudget: {
          connect: {
            name_modelNameType: {
              name: datas.statusBudget.name,
              modelNameType: datas.statusBudget.modelNameType,
            }
          }
        },
        budgetRefNo: datas.budgetRefNo,
        company: {
          connect: {
            name_acronym: {
              name: datas.company.name,
              acronym: datas.company.acronym,
            }
          }
        },

        department: datas.department?.name && datas.department?.acronym
          ? {
              connect: {
                name_acronym: {
                  name: datas.department.name,
                  acronym: datas.department.acronym,
                }
              }
            }
          : undefined,

        category: {
          connect: {
            name_acronym_modelNameType: {
              name: datas.categoryName.name,
              acronym: datas.categoryName.acronym,
              modelNameType: datas.categoryName.modelNameType,
            }
          }
        },

        requester: {
          connect: { id: datas.requesterId }
        },

        purpose: datas.purpose,
        specs: datas.specs,
        quantity: datas.quantity,

        remark: datas.remark,

        submittedAt: datas.submittedAt,
        requestedAmount: datas.requestedAmount,
        approvedAmount: datas.approvedAmount,
        currency: datas.currency,

        auditLogs: {
          create: {
            modelName: "Budget",
            action: "CREATE",
            timestamp: new Date(),
            newDetails: JSON.stringify(datas),
          }
        }
      }
    });
  }
}

seed()
  .then(() => {
    console.log('\n🎉 Budget seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Budget seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

