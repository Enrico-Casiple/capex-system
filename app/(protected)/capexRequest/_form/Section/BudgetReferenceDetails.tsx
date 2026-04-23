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
import { BudgetResponse, BudgetFindByInput, BudgetLedgerGroupByInput, BudgetLedgerGroupByResponse } from "@/lib/generated/api/customHookAPI/graphql";
import { useQuery } from "@apollo/client/react";
import { UseFormReturn } from "react-hook-form";
import * as React from 'react';
import { BudgetFindBy } from '../../../../../lib/api/gql/Budget.gql';
import CustomNumberInput from '../../../../../components/Forms/Inputs/CustomNumberInput';
import { Button } from '@/components/ui/button';
import { RefreshCw } from "lucide-react";
import CustomTextAreaInput from '../../../../../components/Forms/Inputs/CustomTextAreaInput';
import { BudgetLedgerGroupBy } from "@/lib/api/gql/BudgetLedger.gql";

type BudgetFieldMap = {
  "requestedCRF.budgetId": string;
  "requestedCRF.categoryId": string;
  "requestedCRF.approvedAmount": number;
  "requestedCRF.remainingAmount": number;
  "requestedCRF.utilizedBudget": number;
  "requestedCRF.newBalanceAmmount": number;
  "requestedCRF.projectedBudget": number;
  "requestedCRF.requestedAmount": number;
  "requestedCRF.remarks.notes": string;
};

type BudgetFieldName = keyof BudgetFieldMap;

type BudgetReferenceDetailsProps = {
  form: UseFormReturn<Record<string, unknown>>;
};

const modelAPI = modelGQL;

const BudgetReferenceDetails = ({ form }: BudgetReferenceDetailsProps) => {
  const getField = React.useCallback(<K extends BudgetFieldName>(name: K): BudgetFieldMap[K] => {
    return form.watch(name) as BudgetFieldMap[K];
  }, [form]);

  const getValue = React.useCallback(<K extends BudgetFieldName>(name: K): BudgetFieldMap[K] => {
    return form.getValues(name) as BudgetFieldMap[K];
  }, [form]);

  const setField = React.useCallback(<K extends BudgetFieldName>(name: K, value: BudgetFieldMap[K]) => {
    (form.setValue as (field: string, fieldValue: unknown) => void)(name, value);
  }, [form]);

  const watchedBudgetId = getField("requestedCRF.budgetId");
  const watchedRemainingAmount = getField("requestedCRF.remainingAmount");
  const watchedUtilizedBudget = getField("requestedCRF.utilizedBudget");
  const watchedRequestedAmount = getField("requestedCRF.requestedAmount");

  const findBudgetRefNo = watchedBudgetId;

  const budgetQuery = useQuery<{ BudgetFindBy: BudgetResponse }, { input: BudgetFindByInput }>(BudgetFindBy, {
    variables: {
      input: {
        key: "id",
        value: findBudgetRefNo ?? "" as string,
      }
    },
    skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  });

  const findTypeOfRelease = budgetQuery.data?.BudgetFindBy?.data?.budgetLedgers?.find(ledger => ledger.type?.name === "Release of Budget");

  const budgetLegderQueryGroupBy = useQuery<{ BudgetLedgerGroupBy: BudgetLedgerGroupByResponse }, { input: BudgetLedgerGroupByInput }>(BudgetLedgerGroupBy, {
    variables: {
      input: {
        by: [
          "budgetId",
        ],
        where: {
          budgetId: findBudgetRefNo ?? null,
          typeId: findTypeOfRelease?.typeId ?? null,
        },
        _sum: {
          amount: true
        }
      }
    },
    skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  });

  // Effect 1: Populate budget data when budget is selected
  React.useEffect(() => {
    const budgetData = budgetQuery?.data?.BudgetFindBy?.data;
    const budgetLedgerData = budgetLegderQueryGroupBy?.data?.BudgetLedgerGroupBy?.data;
    const budgetLedgerRealeseSum = Array.isArray(budgetLedgerData)
      ? Number((budgetLedgerData[0] as { _sum?: { amount?: number | null } } | undefined)?._sum?.amount ?? 0)
      : 0;

    if (budgetData) {
      setField("requestedCRF.categoryId", budgetData.categoryId ?? "");
      setField("requestedCRF.approvedAmount", budgetData.approvedAmount ?? 0);
      setField("requestedCRF.remainingAmount", budgetData.remainingAmount ?? 0);
      setField("requestedCRF.utilizedBudget", budgetLedgerRealeseSum ?? 0);
      setField("requestedCRF.newBalanceAmmount", 0);
      setField("requestedCRF.projectedBudget", 0);
      setField("requestedCRF.requestedAmount", 0);
    }
  }, [budgetQuery?.data?.BudgetFindBy?.data, budgetLegderQueryGroupBy?.data?.BudgetLedgerGroupBy?.data, setField]);

  // Effect 2: Auto-compute newBalanceAmount and projectedBudget
  React.useEffect(() => {
    const budgetId = watchedBudgetId;
    const remainingAmount = watchedRemainingAmount;
    const utilizedBudget = watchedUtilizedBudget;
    const requestedAmount = watchedRequestedAmount;

    const newBalance = Number(remainingAmount) - Number(utilizedBudget);
    const projectedBalance = newBalance - Number(requestedAmount);

    if (!budgetId) {
      setField("requestedCRF.utilizedBudget", requestedAmount);
    }

    setField("requestedCRF.newBalanceAmmount", newBalance);
    setField("requestedCRF.projectedBudget", projectedBalance);
  }, [
    watchedBudgetId,
    watchedRemainingAmount,
    watchedUtilizedBudget,
    watchedRequestedAmount,
    setField,
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
              (form.setValue as (field: string, value: unknown, options?: unknown) => void)(
                "requestedCRF.budgetId",
                "",
                {
                  shouldDirty: false,
                  shouldTouch: false,
                },
              );
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
                    disabled={Boolean(form.watch("requestedCRF.categoryId"))}
                    findAllWithCursorGQL={modelAPI.BudgetGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.BudgetGQL.findUnique}
                    defaultValueId={
                      getValue("requestedCRF.budgetId") ?? ""
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
                    disabled={Boolean(form.watch("requestedCRF.budgetId"))}
                    findAllWithCursorGQL={
                      modelAPI.CategoryGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                    defaultValueId={
                      getValue("requestedCRF.categoryId") ?? ""
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
