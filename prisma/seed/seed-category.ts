

import {prisma} from '../../lib/prisma/prisma';

const data = [
  {
    name: "Land Purchase",
    acronym: "LAND",
    description: "Expenses related to purchasing land for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
  {
    name: "Store Tools and Equipment",
    acronym: "STE",
    description: "Expenses related to purchasing tools and equipment for the store.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
  {
    name: "Building / Leasehold Improvements",
    acronym: "BLI",
    description: "Expenses related to purchasing or leasing buildings for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
  {
    name: "Property, Plant, and Equipment",
    acronym: "PPE",
    description: "Expenses related to purchasing or leasing plant equipment and machinery for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
   {
    name: "Furniture and Fixtures",
    acronym: "FF",
    description: "Expenses related to purchasing or leasing furniture and fixtures for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
   {
    name: "Transportation",
    acronym: "TEQ",
    description: "Expenses related to purchasing or leasing transportation assets for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
  {
    name: "Office Equipment",
    acronym: "OES",
    description: "Expenses related to purchasing or leasing office equipment for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  },
  {
    name: "Construction in Progress",
    acronym: "CIP",
    description: "Expenses related to purchasing or leasing construction assets for business purposes.",
    isActive: true,
    modelNameType: "BudgetCategory",
  }
]

const seed = async () => {
  for (const datas of data) {

    await prisma.category.create({
      data: {
        ...datas,
        auditLogs: {
          create: {
            modelName: 'Category',
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
    console.log('\n🎉 Category seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Category seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

