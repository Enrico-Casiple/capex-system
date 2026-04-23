

import {prisma} from '../../lib/prisma/prisma';

const company = [
  {
    name: "Unilogix Inc.",
    acronym: "UI",
    description: "",
    groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@unilogix.com",
    logo: "unilogix-logo.png"
  },
   {
    name: "Omnivores Inc.",
    acronym: "OI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@omnivores.com",
    logo: "omnivores-logo.png"
  },
  {
    name: "Omnivires Manial Inc.",
    acronym: "OMI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@omnivores.com",
    logo: "omnivores-logo.png"
  },
  {
    name: "Gourment Garadge",
    acronym: "GG",
    description: "",
    groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@gourmentgaradge.com",
    logo: "gourmentgaradge-logo.png"
  },
  {
    name: "Rustan Design and Specialist Inc.",
    acronym: "RDSI",
    description: "",
    groupOfCompanyName: "Rustan Group of Companies",
    isActive: true,
    email: "info@rustan.com",
    logo: "rustan-logo.png"
  },
  {
    name: "Lavender Holding Inc.",
    acronym: "LHI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@lavender.com",
    logo: "lavender-logo.png"
  },
  {
    name: "Bluegrass Properties Development Inc.",
    acronym: "BPDI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@bluegrassproperties.com",
    logo: "bluegrass-logo.png"
  },
  {
    name: "Educar Shared Services Inc.",
    acronym: "ESSI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@educar.com",
    logo: "educar-logo.png"
  },
   {
    name: "Educar Distribution Inc.",
    acronym: "EDI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@educardistribution.com",
    logo: "educardistribution-logo.png"
  },
   {
    name: "Swirly Goodness Philippines Inc.",
    acronym: "SGPI",
    description: "",
     groupOfCompanyName: "Educar Group of Companies",
    isActive: true,
    email: "info@swirlygoodness.com",
    logo: "swirlygoodness-logo.png"
  },
]

const companySeed = async () => {
  for (const companyData of company) {

    const findGroupOfCompany = await prisma.groupOfCompany.findFirst({
      where: { name: companyData.groupOfCompanyName },
    });

    if (!findGroupOfCompany) {
      console.warn(`⚠️ Group of Company "${companyData.groupOfCompanyName}" not found
      Skipping company "${companyData.name}"`);
      continue;
    }

    await prisma.company.create({
      data: {
        name: companyData.name,
        acronym: companyData.acronym,
        description: companyData.description,
        groupOfCompanyId: findGroupOfCompany?.id || '',
        email: companyData.email,
        logo: companyData.logo,
        auditLogs: {
          create: {
            modelName: 'Company',
            action: 'CREATE',
            timestamp: new Date(),
            newDetails: JSON.stringify(companyData),
          }
        }
      },
    });
  }
}

companySeed()
  .then(() => {
    console.log('\n🎉 Company seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Company seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


