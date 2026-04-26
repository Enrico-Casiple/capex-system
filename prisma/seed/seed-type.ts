import {prisma} from '../../lib/prisma/prisma'


const data = [
  {
    name: "Reservation",
    description: "Budget temporarily reserved for planned expenses before a purchase order (PO) is created. This does not represent a confirmed obligation yet.",
    isActive: true,
    modelNameType: "BudgetLedgerType",
  },
  {
    name: "Commitment",
    description: "Budget committed through the creation of a purchase order (PO), indicating a formal obligation to spend but not yet an actual expense.",
    isActive: true,
    modelNameType: "BudgetLedgerType",
  },
  {
    name: "Actual",
    description: "Budget utilized through recorded invoices or completed payments. This represents the actual expense and reduces available budget.",
    isActive: true,
    modelNameType: "BudgetLedgerType",
  },
  {
    name: "Release",
    description: "Budget returned to available balance due to cancellation or reduction of a reservation or commitment (e.g., PO cancellation or unused funds).",
    isActive: true,
    modelNameType: "BudgetLedgerType",
  },
  {
    name: "Adjustment",
    description: "Manual increase or decrease of the total budget allocation due to reallocation, correction, or management decision.",
    isActive: true,
    modelNameType: "BudgetLedgerType",
  },
  {
    name: "Installment",
    description: "Payment made in multiple parts over time, often for larger expenses. Each installment represents a portion of the total payment obligation.",
    isActive: true,
    modelNameType: "PaymentLedgerType",
  },
  {
    name: "Partial Payment",
    description: "Payment made for a portion of the total invoice amount, with the remaining balance to be paid later. This allows for flexibility in managing cash flow while fulfilling payment obligations.",
    isActive: true,
    modelNameType: "PaymentLedgerType",
  },
  {
    name: "Full Payment",
    description: "Payment made for the entire invoice amount, settling the full obligation.",
    isActive: true,
    modelNameType: "PaymentLedgerType",
  },
  {
    name: "Purchase Order Creation",
    description: "Creation of a purchase order (PO), indicating a formal commitment to spend but not yet an actual expense.",
    isActive: true,
    modelNameType: "SourceLedgerType",
  },
  {
    name: "Invoice Creation",
    description: "Creation of an invoice, representing a formal request for payment and indicating that an expense has been incurred.",
    isActive: true,
    modelNameType: "SourceLedgerType",
  },
  {
    name: "Journal Entry Creation",
    description: "Creation of a journal entry, indicating a formal commitment to spend but not yet an actual expense.",
    isActive: true,
    modelNameType: "SourceLedgerType",
  },
  {
    name: "Manual Entry Creation",
    description: "Creation of a manual entry, indicating a formal commitment to spend but not yet an actual expense.",
    isActive: true,
    modelNameType: "SourceLedgerType",
  },
  {
    name: "Static Entry",
    description: "Creation of a static entry, is user assignment based on role for approval template",
    isActive: true,
    modelNameType: "WorkFlowApprovalType",
  },
  {
    name: "Dynamic Entry",
    description: "Creation of a dynamic entry, is user assignment based on condition for approval template",
    isActive: true,
    modelNameType: "WorkFlowApprovalType",
  },
];

const seed = async () => {
  for (const datas of data) {
    await prisma.type.create({
      data: {
        ...datas,
        auditLogs: {
          create: {
            modelName: 'Type',
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
    console.log('\n🎉 Type seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Type seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
