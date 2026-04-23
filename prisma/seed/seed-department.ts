

import {prisma} from '../../lib/prisma/prisma';

const data = [
  {
    name: "Information Technology",
    acronym: "IT",
    description: `Department responsible for managing and maintaining the organization's technology infrastructure, including hardware, software, networks, and data security.`,
    isActive: true,
    company: {
      connect: {
        name_acronym: {
          name: "Unilogix Inc.",
          acronym: "UI"
        }
      }
    }
  },
  {
    name: "Facility Management",
    acronym: "FM",
    description: `Department responsible for managing and maintaining the organization's facilities and real estate assets.`,
    isActive: true,
    company: {
      connect: {
        name_acronym: {
          name: "Unilogix Inc.",
          acronym: "UI"
        }
      }
    }
  },
    {
    name: "Human Resources",
    acronym: "HR",
    description: `Department responsible for managing the organization's workforce and employee relations.`,
    isActive: true,
    company: {
      connect: {
        name_acronym: {
          name: "Unilogix Inc.",
          acronym: "UI"
        }
      }
    }
  },
]

const seed = async () => {
  for (const datas of data) {

    await prisma.department.create({
      data: {
        ...datas,
        auditLogs: {
          create: {
            modelName: 'Department',
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
    console.log('\n🎉 Department seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Department seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

