

import {prisma} from '../../lib/prisma/prisma';

const groupOfCompanies = [
  {
    name: "Educar Group of Companies",
    acronym: "EGOC",
    description: "",
    isActive: true,
  },
  {
    name: "Rustan Group of Companies",
    acronym: "RGOC",
    description: "",
    isActive: true,
  },
]

const groupOfCompaniesSeed = async () => {
  for (const groupOfCompanyData of groupOfCompanies) {
    await prisma.groupOfCompany.create({
      data: {
        ...groupOfCompanyData,
        auditLogs: {
          create: {
            modelName: 'GroupOfCompany',
            action: 'CREATE',
            timestamp: new Date(),
            newDetails: JSON.stringify(groupOfCompanyData),
          }
        }
      },
    });
  }
}

groupOfCompaniesSeed()
  .then(() => {
    console.log('\n🎉 Group of Companies seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Group of Companies seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

