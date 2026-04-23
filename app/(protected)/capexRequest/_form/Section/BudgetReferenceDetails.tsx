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
import { Button } from '@/components/ui/button';
import { RefreshCw } from "lucide-react";
import CustomTextAreaInput from '../../../../../components/Forms/Inputs/CustomTextAreaInput';

type BudgetReferenceDetailsProps = {
  form: UseFormReturn<Request>;
};

const modelAPI = modelGQL;

const BudgetReferenceDetails = ({ form }: BudgetReferenceDetailsProps) => {
  const findBudgetRefNo = form.watch("requestedCRF.budgetId");

  const budgetQuery = useQuery<{ BudgetFindBy: BudgetResponse }, { input: BudgetFindByInput }>(BudgetFindBy, {
    variables: {
      input: {
        key: "id",
        value: findBudgetRefNo ?? "" as string,
      }
    },
    skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  });

  const findTypeOfRealese = budgetQuery.data?.BudgetFindBy?.data?.budgetLedgers?.find(ledger => ledger.type?.name === "Release of Budget");

  const budgetLegderQueryGroupBy = useQuery<{ BudgetLedgerGroupBy: BudgetLedgerGroupByResponse }, { input: BudgetLedgerGroupByInput }>(BudgetLedgerGroupBy, {
    variables: {
      input: {
        by: [
          budgetId
        ],
        where: {
          budgetId: findBudgetRefNo ?? "" as string,
          typeId: findTypeOfRealese ? { equals: findTypeOfRealese.typeId } : undefined
        },
        _sum: {
          amount: true
        }
      }
    },
    // skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  });

  // Effect 1: Populate budget data when budget is selected
  React.useEffect(() => {
    const budgetData = budgetQuery?.data?.BudgetFindBy?.data;

    if (budgetData) {
      form.setValue("requestedCRF.categoryId", budgetData.categoryId ?? "" as string);
      form.setValue("requestedCRF.approvedAmount", budgetData.approvedAmount ?? 0);
      form.setValue("requestedCRF.remainingAmount", budgetData.remainingAmount ?? 0);
      form.setValue("requestedCRF.utilizedBudget", 0);
      form.setValue("requestedCRF.newBalanceAmmount", 0);
      form.setValue("requestedCRF.projectedBudget", 0);
      form.setValue("requestedCRF.requestedAmount", 0); // Clear requested amount too
    }
  }, [budgetQuery.data?.BudgetFindBy?.data?.id]);

  // Effect 2: Auto-compute newBalanceAmount and projectedBudget
  React.useEffect(() => {
    const budgetId = form.watch("requestedCRF.budgetId");
    const remainingAmount = form.watch("requestedCRF.remainingAmount");
    const utilizedBudget = form.watch("requestedCRF.utilizedBudget");
    const requestedAmount = form.watch("requestedCRF.requestedAmount");

    const newBalance = Number(remainingAmount) - Number(utilizedBudget);
    const projectedBalance = newBalance - Number(requestedAmount);

    if (!budgetId) {
      // Set the utilizedBudget, as the Requested Amount
      form.setValue("requestedCRF.utilizedBudget", requestedAmount);
    }

    form.setValue("requestedCRF.newBalanceAmmount", newBalance ?? 0);
    form.setValue("requestedCRF.projectedBudget", projectedBalance ?? 0);
  }, [
    form.watch("requestedCRF.budgetId"),
    form.watch("requestedCRF.remainingAmount"),
    form.watch("requestedCRF.utilizedBudget"),
    form.watch("requestedCRF.requestedAmount"),
  ]);

  return (
    <section className="space-y-4">
      {/* <pre>{JSON.stringify(budgetQuery?.data?.BudgetFindBy?.data?.approvedAmount, null, 2)}</pre> */}
      <div className="flex items-center gap-3 pb-3 border-b">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold">
          II.
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-lg font-semibold">Budget Reference Details</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Provide budget reference information
            </p>
          </div>
          <div>
            <Button variant="outline" size="icon" type="button" onClick={() => {
              form.setValue("requestedCRF.budgetId", "" as string, {
                shouldDirty: false,
                shouldTouch: false,
              });
              form.clearErrors("requestedCRF");
            }}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div >
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
                    name={`requestedCRF.budgetId`}
                    control={form.control}
                    label={""}
                    disabled={form.watch("requestedCRF.categoryId") ?? false ?? undefined} // Disable if no budget selected
                    findAllWithCursorGQL={modelAPI.BudgetGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.BudgetGQL.findUnique}
                    defaultValueId={
                      form.getValues(`requestedCRF.budgetId`) ?? ""
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
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { budgetRefNo?: string; id?: string };
                      return {
                        label: d.budgetRefNo ?? "",
                        value: d.id ?? "", // Store budgetRefNo as value
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { budgetRefNo?: string; id?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.budgetRefNo ?? "",
                        value: d.data.id ?? "", // Store budgetRefNo as value
                      };
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomSingleSelectInput
                    name={`requestedCRF.categoryId`}
                    control={form.control}
                    label={``}
                    disabled={form.watch("requestedCRF.budgetId") ?? false ?? undefined} // Disable if no budget selected
                    findAllWithCursorGQL={
                      modelAPI.CategoryGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                    defaultValueId={
                      form.getValues(
                        `requestedCRF.categoryId`,
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
                    uniqueVariables={(id) => ({ id })}
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
                    name={`requestedCRF.approvedAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Approved Amount`}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomNumberInput
                    name={`requestedCRF.remainingAmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Remaining Amount`}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomNumberInput
                    name={`requestedCRF.utilizedBudget`}
                    control={form.control}
                    label={``}
                    placeholder={`Utilized Amount`}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900">
                  <CustomNumberInput
                    name={`requestedCRF.newBalanceAmmount`}
                    control={form.control}
                    label={``}
                    placeholder={`Balance Amount`}
                    inputProps={{
                      disabled: true
                    }}
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
                    inputProps={{
                      disabled: true
                    }}
                  />
                </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div><CustomTextAreaInput
          name="requestedCRF.remarks.notes"
          control={form.control}
          label="Remarks / Purpose"
          placeholder="Enter remarks or purpose for the budget request or if this are Construction In Progress related, you may indicate the project name and location here."
        /></div>
      </div>
    </section >
  );
};

export default BudgetReferenceDetails;
