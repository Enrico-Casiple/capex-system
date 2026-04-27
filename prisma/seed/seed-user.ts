import {prisma} from '../../lib/prisma/prisma'
import {hashPassword} from '../../lib/util/bcryptjs'


const data = [
  {
    name: "Super Admin",
    email: "superadmin@email.com",
    password: "superadminpassword",
    userName: "superadmin",
    userRoles: {
      connect: {
        id: "69d44b7364ae5c7bd355c615"
      }
    },
  }
];

const seed = async () => {
  for (const datas of data) {
    await prisma.user.create({
      data: {
        ...datas,
        password: await hashPassword(datas.password),
        auditLogs: {
          create: {
            modelName: 'User',
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
    console.log('\n🎉 User seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ User seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
