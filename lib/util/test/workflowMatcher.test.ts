import { getMatchingSteps, getFirstMatchingStep, hasMatchingSteps } from '../workflowMatcher';

const data = {
  WorkFlowTemplateFindUnique: {
    __typename: "WorkFlowTemplateResponse",
    isSuccess: true,
    message: "Retrieved WorkFlowTemplate id:69eef45eb4b3e16eebf0b972",
    code: "WORKFLOWTEMPLATE_RETRIEVE_UNIQUE_SUCCESS",
    data: {
      __typename: "WorkFlowTemplate",
      id: "69eef45eb4b3e16eebf0b972",
      name: "General Form For Approval",
      description: "General Form For Approval for all ",
      isGlobal: false,
      version: 10,
      isActive: true,
      createdAt: "2026-04-27T05:30:06.627Z",
      updatedAt: "2026-04-27T07:36:29.288Z",
      scope: [
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f23",
          companyId: "69e710d2191183c771f4c6eb",
          company: { __typename: "Company", name: "Swirly Goodness Philippines Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f24",
          companyId: "69e710d2191183c771f4c6e9",
          company: { __typename: "Company", name: "Educar Distribution Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f25",
          companyId: "69e710d2191183c771f4c6e7",
          company: { __typename: "Company", name: "Educar Shared Services Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f26",
          companyId: "69e710d1191183c771f4c6e5",
          company: { __typename: "Company", name: "Bluegrass Properties Development Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f27",
          companyId: "69e710d1191183c771f4c6e3",
          company: { __typename: "Company", name: "Lavender Holding Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f28",
          companyId: "69e710d1191183c771f4c6e1",
          company: { __typename: "Company", name: "Rustan Design and Specialist Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f29",
          companyId: "69e710d1191183c771f4c6df",
          company: { __typename: "Company", name: "Gourment Garadge" },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f2a",
          companyId: "69e710d1191183c771f4c6dd",
          company: { __typename: "Company", name: "Omnivires Manial Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f2b",
          companyId: "69e710d1191183c771f4c6db",
          company: { __typename: "Company", name: "Omnivores Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        },
        {
          __typename: "WorkFlowTemplateScope",
          id: "69ef11fe4ac41b6c5ebd1f2c",
          companyId: "69e710d1191183c771f4c6d9",
          company: { __typename: "Company", name: "Unilogix Inc." },
          departmentId: null,
          department: null,
          positionId: null,
          position: null,
          jobLevelId: null,
          jobLevel: null
        }
      ],
      steps: [
        {
          __typename: "WorkFlowStepTemplate",
          id: "69ef11ff4ac41b6c5ebd1f2d",
          stepNumber: 1,
          assignmentTypeId: "69ee17c8471de33f370cc36c",
          assignedToUserId: null,
          isHaveCondition: false,
          conditions: []
        },
        {
          __typename: "WorkFlowStepTemplate",
          id: "69ef11ff4ac41b6c5ebd1f2e",
          stepNumber: 2,
          assignmentTypeId: "69ee17c8471de33f370cc36a",
          assignedToUserId: "69dc9dbf57b4ce9eb090a8f9",
          isHaveCondition: true,
          conditions: [
            {
              __typename: "Config",
              modelName: "WorkFlowTemplateConfig",
              group: "WorkFlowTemplateConfig",
              codeKey: "workflow_template_config_conditions",
              code: "workflow_template_config_conditions",
              codeLabel: "Conditions",
              value: {
                nodeType: "RULE",
                logicalOperator: "",
                field: "Amount",
                operator: "===",
                value: 1000000
              }
            }
          ]
        }
      ]
    }
  }
};
// Test Case 1: Data that matches Step 1 (AND condition)
console.log("=== Test Case 1: Match Step 1 (AND) ===");
const testData1 = {
  Category: "Construction in Progress",
  Amount: 1000000
};
const result1 = getMatchingSteps(testData1, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Request Data:", testData1);
console.log("Matching Steps:", result1.map(s => ({ stepNumber: s.stepNumber, id: s.id })));
console.log("Expected: Steps 1, 2, 3 (all match)");
console.log("");

// Test Case 2: Data that matches Step 2 (OR condition) but not Step 1
console.log("=== Test Case 2: Match Step 2 (OR) but not Step 1 ===");
const testData2 = {
  Category: "Construction in Progress",
  Amount: 500000 // Different amount
};
const result2 = getMatchingSteps(testData2, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Request Data:", testData2);
console.log("Matching Steps:", result2.map(s => ({ stepNumber: s.stepNumber, id: s.id })));
console.log("Expected: Step 2 only (OR condition matches on Category)");
console.log("");

// Test Case 3: Data that doesn't match any conditions
console.log("=== Test Case 3: No matches ===");
const testData3 = {
  Category: "Equipment",
  Amount: 500
};
const result3 = getMatchingSteps(testData3, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Request Data:", testData3);
console.log("Matching Steps:", result3.map(s => ({ stepNumber: s.stepNumber, id: s.id })));
console.log("Expected: No steps (no conditions match)");
console.log("");

// Test Case 4: Get first matching step
console.log("=== Test Case 4: Get first matching step ===");
const firstStep = getFirstMatchingStep(testData1, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Request Data:", testData1);
console.log("First Matching Step:", firstStep ? { stepNumber: firstStep.stepNumber, id: firstStep.id } : null);
console.log("Expected: Step 1");
console.log("");

// Test Case 5: Check if has matching steps
console.log("=== Test Case 5: Has matching steps ===");
const hasMatch1 = hasMatchingSteps(testData1, data.WorkFlowTemplateFindUnique.data?.steps as never);
const hasMatch3 = hasMatchingSteps(testData3, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Has match for testData1:", hasMatch1, "(Expected: true)");
console.log("Has match for testData3:", hasMatch3, "(Expected: false)");
console.log("");

// Test Case 6: Step 3 (no GROUP, just RULEs with implicit AND)
console.log("=== Test Case 6: Step 3 (implicit AND) ===");
const testData6 = {
  Category: "Construction in Progress",
  Amount: 1000000
};
const result6 = getMatchingSteps(testData6, data.WorkFlowTemplateFindUnique.data?.steps as never);
console.log("Request Data:", testData6);
console.log("Matching Steps:", result6.map(s => ({ stepNumber: s.stepNumber, id: s.id })));
console.log("Expected: Steps 1, 2, 3 (all match)");

// npx tsx /home/enrico/Desktop/Projects/capex-system/lib/util/test/workflowMatcher.test.ts
