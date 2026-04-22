"use client";
import CustomSingleSelectInput from "@/components/Forms/Inputs/CustomSingleSelectInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { modelGQL } from "@/lib/api/crud.gql";
import { BudgetResponse, Request, BudgetFindByInput } from "@/lib/generated/api/customHookAPI/graphql";
import { useQuery } from "@apollo/client/react";
import { UseFormReturn } from "react-hook-form";
import * as React from 'react';
import { BudgetFindBy } from '../../../../../lib/api/gql/Budget.gql';
import CustomNumberInput from '../../../../../components/Forms/Inputs/CustomNumberInput';

type BudgetReferenceDetailsProps = {
  form: UseFormReturn<Request>;
};

const modelAPI = modelGQL;

const BudgetReferenceDetails = ({ form }: BudgetReferenceDetailsProps) => {
  const findBudgetRefNo = form.watch("requestedCRF.budget.budgetRefNo");

  const budgetQuery = useQuery<{ BudgetFindBy: BudgetResponse }, { input: BudgetFindByInput }>(BudgetFindBy, {
    variables: {
      input: {
        key: "budgetRefNo",
        value: findBudgetRefNo ?? "",
      }
    },
    skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  });

  React.useEffect(() => {
    if (budgetQuery.data?.BudgetFindBy?.data) {
      const budgetData = budgetQuery.data.BudgetFindBy.data;
      
      // Set categoryId based on retrieved budget data
      form.setValue("requestedCRF.budget.categoryId", budgetData.categoryId ?? "");
      form.setValue("requestedCRF.categoryId", budgetData.categoryId ?? "");
      
      // Keep the budgetRefNo as the ID (for queries)
      // The display label will come from mapOption/mapDefaultOption
    } else {
      // Only clear if budgetRefNo is explicitly cleared
      form.setValue("requestedCRF.budget.categoryId", "");
      form.setValue("requestedCRF.categoryId", "");
    }
  }, [budgetQuery.data?.BudgetFindBy?.data?.categoryId]);

  return (
    <section className="space-y-4">
      {/* <pre>{JSON.stringify(budgetQuery?.data?.BudgetFindBy?.data?.categoryId, null, 2)}</pre> */}
      <div className="flex items-center gap-3 pb-3 border-b">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold">
          II.
        </div>
        <div>
          <h3 className="text-lg font-semibold">Budget Reference Details</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Provide budget reference information
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {/* Budget Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gradient-to-r from-slate-100 to-slate-50">
              <TableRow className="hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Budget Reference
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Category
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Approved Budget
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Remaining Budget
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Utilized Amount
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Balance Amount
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Requested Amount
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Projected Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50 transition-colors">
                <TableCell className="text-slate-900">
                  <CustomSingleSelectInput
                    name={`requestedCRF.budget.budgetRefNo`}
                    control={form.control}
                    label={""}
                    findAllWithCursorGQL={modelAPI.BudgetGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.BudgetGQL.findBy}
                    defaultValueId={
                      form.getValues(`requestedCRF.budget.budgetRefNo`) ?? ""
                    }
                    placeholder={`Search budget...`}
                    searchPlaceholder={`Search budget...`}
                    emptySelectedMessage={`Budget already selected.`}
                    emptyMessage={`No budget found.`}
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? { name: { contains: search, mode: "insensitive" } }
                          : undefined,
                      },
                    })}
                     uniqueVariables={(budgetRefNo) => ({
                      input: {
                        key: "budgetRefNo",
                        value: budgetRefNo,
                      }
                    })}
                    mapOption={(data: unknown) => {
                      const d = data as { budgetRefNo?: string; id?: string };
                      return {
                        label: d.budgetRefNo ?? "",
                        value: d.budgetRefNo ?? "", // Store budgetRefNo as value
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { budgetRefNo?: string; id?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.budgetRefNo ?? "",
                        value: d.data.budgetRefNo ?? "", // Store budgetRefNo as value
                      };
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomSingleSelectInput
                    name={`requestedCRF.categoryId`}
                    control={form.control}
                    label={``}
                    findAllWithCursorGQL={
                      modelAPI.CategoryGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                    defaultValueId={
                      form.getValues(
                        `requestedCRF.budget.categoryId`,
                      ) ?? ""
                    }
                    placeholder={`Search category...`}
                    searchPlaceholder={`Search category...`}
                    emptySelectedMessage={`Category already selected.`}
                    emptyMessage={`No category found.`}
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? {
                            name: { contains: search, mode: "insensitive" },
                          }
                          : undefined,
                      },
                    })}
                    uniqueVariables={(key, value) => ({ key, value })}
                    mapOption={(data: unknown) => {
                      const d = data as {
                        id?: string;
                        name?: string;
                      };
                      return {
                        label: d.name ?? "",
                        value: d.id ?? "",
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: {
                          id?: string;
                          name?: string;
                          userName?: string;
                          email?: string;
                        };
                      };
                      if (!d?.data) return null;
                      return {
                        label:
                          d.data.name ??
                          d.data.userName ??
                          d.data.email ??
                          "",
                        value: d.data.id ?? "",
                      };
                    }}
                  />
                </TableCell>
                 <TableCell className="text-slate-900">
                  <CustomNumberInput 
                    name={`requestedCRF.budget.approvedAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Approved Amount`}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomNumberInput 
                    name={`requestedCRF.budget.remainingAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Remaining Amount`}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                   <CustomNumberInput 
                    name={`requestedCRF.utilizedBudget`}
                    control={form.control}
                    label={``}
                    placeholder={`Utilized Amount`}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                   <CustomNumberInput 
                    name={`requestedCRF.budget.remainingAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Balance Amount`}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                   <CustomNumberInput 
                    name={`requestedCRF.requestedAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Requested Amount`}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                   <CustomNumberInput 
                    name={`requestedCRF.projectedBudget`}
                    control={form.control}
                    label={``}
                    placeholder={`Projected Budget`}
                  />
                </TableCell>
                
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>Remarks / Purpose</div>
      </div>
    </section>
  );
};

export default BudgetReferenceDetails;
