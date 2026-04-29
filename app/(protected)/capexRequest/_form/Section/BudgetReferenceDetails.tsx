"use client";

import CustomSingleSelectInput from "@/components/Forms/Inputs/CustomSingleSelectInput";
import CustomNumberInput from "@/components/Forms/Inputs/CustomNumberInput";
import CustomTextAreaInput from "@/components/Forms/Inputs/CustomTextAreaInput";
import CustomImportInput from "@/components/Forms/Inputs/CustomImportInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { modelGQL } from "@/lib/api/crud.gql";
import {
  BudgetResponse,
  BudgetFindByInput,
  BudgetLedgerGroupByInput,
  BudgetLedgerGroupByResponse,
} from "@/lib/generated/api/customHookAPI/graphql";
import { useQuery } from "@apollo/client/react";
import { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { BudgetFindBy } from "../../../../../lib/api/gql/Budget.gql";
import { BudgetLedgerGroupBy } from "@/lib/api/gql/BudgetLedger.gql";
import { ChevronDown, RotateCcw } from "lucide-react";
import { ActionType } from "@/app/_component/Row/Action";
import { useListContext } from "@/app/_context/ListContext/ListProvider";
import ProtectedComponent from "@/app/_component/RoleGate/ProtectedComponent";
import VerificationButton from "../_component/VerificationButton";

type BudgetFieldMap = {
  quotationAmount: number;
  "requestedCRF.name": string;
  "requestedCRF.description": string;
  "requestedCRF.budgetId": string;
  "requestedCRF.statusId": string;
  "requestedCRF.companyId": string;
  "requestedCRF.departmentId": string;
  "requestedCRF.categoryId": string;
  "requestedCRF.approvedAmount": number;
  // "requestedCRF.remainingAmount": number;
  "requestedCRF.utilizedBudget": number;
  "requestedCRF.newBalanceAmmount": number;
  "requestedCRF.projectedBudget": number;
  "requestedCRF.requestedAmount": number;
  "requestedCRF.remark.notes": string;
  "requestedCRF.remark.verificationNotes": string;
  "requestedCRF.id": string;
};

type BudgetFieldName = keyof BudgetFieldMap;

type BudgetReferenceDetailsProps = {
  form: UseFormReturn<Record<string, unknown>>;
  isViewMode: boolean;
  actionType?: ActionType;
  isForFinance: boolean;
};

const modelAPI = modelGQL;

const BudgetReferenceDetails = ({ form, isViewMode, actionType, isForFinance }: BudgetReferenceDetailsProps) => {
  const [mobileExpanded, setMobileExpanded] = React.useState(false);
  const { modelName } = useListContext()

  const getField = React.useCallback(
    <K extends BudgetFieldName>(name: K): BudgetFieldMap[K] => {
      return form.watch(name) as BudgetFieldMap[K];
    },
    [form]
  );

  const getValue = React.useCallback(
    <K extends BudgetFieldName>(name: K): BudgetFieldMap[K] => {
      return form.getValues(name) as BudgetFieldMap[K];
    },
    [form]
  );

  const setField = React.useCallback(
    <K extends BudgetFieldName>(name: K, value: BudgetFieldMap[K]) => {
      (form.setValue as (field: string, fieldValue: unknown) => void)(
        name,
        value
      );
    },
    [form]
  );

  const watchedBudgetId = getField("requestedCRF.budgetId");
  const watchedRemainingAmount = getField("requestedCRF.approvedAmount");
  const watchedUtilizedBudget = getField("requestedCRF.utilizedBudget");
  const watchedRequestedAmount = getField("requestedCRF.requestedAmount");

  const findBudgetRefNo = watchedBudgetId;

  const budgetQuery = useQuery<
    { BudgetFindBy: BudgetResponse },
    { input: BudgetFindByInput }
  >(BudgetFindBy, {
    variables: {
      input: {
        key: "id",
        value: findBudgetRefNo ?? ("" as string),
      },
    },
    skip: !findBudgetRefNo,
  });

  const findTypeOfActual = budgetQuery.data?.BudgetFindBy?.data?.budgetLedgers?.find(
    (ledger) => ledger.type?.name === "Actual"
  );

  const budgetLedgerQueryGroupBy = useQuery<
    { BudgetLedgerGroupBy: BudgetLedgerGroupByResponse },
    { input: BudgetLedgerGroupByInput }
  >(BudgetLedgerGroupBy, {
    variables: {
      input: {
        by: ["budgetId"],
        where: {
          budgetId: findBudgetRefNo ?? null,
          typeId: findTypeOfActual?.typeId ?? null,
        },
        _sum: {
          amount: true,
        },
      },
    },
    skip: !findBudgetRefNo,
  });

  // Effect 1: When budget is selected, populate budget-related fields
  React.useEffect(() => {
    const budgetData = budgetQuery?.data?.BudgetFindBy?.data;
    const budgetLedgerData = budgetLedgerQueryGroupBy?.data?.BudgetLedgerGroupBy?.data;
    const budgetLedgerReleaseSum = Array.isArray(budgetLedgerData)
      ? Number(
        (
          budgetLedgerData[0] as
          | { _sum?: { amount?: number | null } }
          | undefined
        )?._sum?.amount ?? 0
      )
      : 0;

    if (budgetData && watchedBudgetId) {
      // Auto-populate from budget selection
      setField("requestedCRF.categoryId", budgetData.categoryId ?? "");
      setField("requestedCRF.approvedAmount", budgetData.approvedAmount ?? 0);
      setField("requestedCRF.utilizedBudget", budgetLedgerReleaseSum ?? 0);
      setField("requestedCRF.newBalanceAmmount", 0);
      setField("requestedCRF.projectedBudget", 0);
      setField("requestedCRF.requestedAmount", 0);
    } else if (!watchedBudgetId) {
      // Reset all fields when budget is cleared/removed
      setField("requestedCRF.categoryId", "");
      setField("requestedCRF.approvedAmount", 0);
      setField("requestedCRF.utilizedBudget", 0);
      setField("requestedCRF.newBalanceAmmount", 0);
      setField("requestedCRF.projectedBudget", 0);
      setField("requestedCRF.requestedAmount", 0);
    }
  }, [watchedBudgetId, budgetQuery.data, budgetLedgerQueryGroupBy.data, setField]);

  // Effect 2: Calculate derived fields when amounts change
  React.useEffect(() => {
    const budgetId = watchedBudgetId;
    const remainingAmount = Number(watchedRemainingAmount) || 0;
    const utilizedBudget = Number(watchedUtilizedBudget) || 0;
    const requestedAmount = Number(watchedRequestedAmount) || 0;
    const quotationAmount = getField("quotationAmount") as number;

    // Update name and description
    setField("requestedCRF.name", `Budget Request for ${findBudgetRefNo || "Unbudgeted"}`);
    setField(
      "requestedCRF.description",
      `This budget request is referencing the budget: ${findBudgetRefNo || "Unbudgeted"}`
    );
    setField("requestedCRF.companyId", form.watch("companyId") as string);
    setField(
      "requestedCRF.departmentId",
      form.watch("responsibilityCenterId") as string
    );
    setField("requestedCRF.statusId", "69ef2111f681bdf7f3214d83");

    // Calculate balances
    const newBalance = remainingAmount - utilizedBudget;
    const projectedBalance = newBalance - requestedAmount;

    setField("requestedCRF.newBalanceAmmount", newBalance);
    setField("requestedCRF.projectedBudget", projectedBalance);

    // If quotation amount is set, use it as requested amount
    if (quotationAmount > 0) {
      setField("requestedCRF.requestedAmount", quotationAmount);
    }
  }, [
    watchedBudgetId,
    watchedRemainingAmount,
    watchedUtilizedBudget,
    watchedRequestedAmount,
    getField("quotationAmount"),
    form,
    findBudgetRefNo,
    setField,
  ]);

  const resetBudgetReferenceDetails = React.useCallback(() => {
    setField("quotationAmount", 0);
    setField("requestedCRF.id", "");
    setField("requestedCRF.budgetId", "");
    setField("requestedCRF.categoryId", "");
    setField("requestedCRF.approvedAmount", 0);
    // setField("requestedCRF.remainingAmount", 0);
    setField("requestedCRF.utilizedBudget", 0);
    setField("requestedCRF.newBalanceAmmount", 0);
    setField("requestedCRF.projectedBudget", 0);
    setField("requestedCRF.requestedAmount", 0);
    setField("requestedCRF.remark.notes", "");
    setField("requestedCRF.remark.verificationNotes", "");
    form.clearErrors("requestedCRF");
  }, [form, setField]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);

  const budgetStats = [
    {
      label: "Approved Budget",
      value: getValue("requestedCRF.approvedAmount"),
      color: "text-slate-900",
    },
    // {
    //   label: "Remaining",
    //   value: getValue("requestedCRF.remainingAmount"),
    //   color: "text-blue-600",
    // },
    {
      label: "Utilized",
      value: getValue("requestedCRF.utilizedBudget"),
      color: "text-amber-600",
    },
    {
      label: "Balance",
      value: getValue("requestedCRF.newBalanceAmmount"),
      color: "text-green-600",
    },
    {
      label: "Requested",
      value: getValue("requestedCRF.requestedAmount"),
      color: "text-purple-600",
    },
    {
      label: "Projected",
      value: getValue("requestedCRF.projectedBudget"),
      color: "text-primary font-bold",
    },
  ];


  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
            II.
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold">
              Budget Reference Details
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              Provide budget reference information and upload quotations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            onClick={resetBudgetReferenceDetails}
            className={`text-muted-foreground hover:text-destructive gap-1.5 ${isViewMode ? "hidden" : ""}`}
            title="Reset all items"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          {/* STATUS IS "For Finance Review" */}
          {
            !getValue("requestedCRF.budgetId") && actionType === "edit" && !isForFinance && (
              <VerificationButton
                modelName={modelName}
                isViewMode={isViewMode!}
                getValueBudgetId={() => getValue("requestedCRF.budgetId")}
                getValueId={() => getValue("requestedCRF.id")}
                form={form}
              />
            )
          }
        </div>
      </div>

      <div className="space-y-4">
        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomImportInput<Record<string, unknown>>
            name="quotationUrl"
            label="Upload Quotation"
            control={form.control}
            setError={form.setError}
            clearErrors={form.clearErrors}
            maxSizeMB={10}
            allowedExtensions={["pdf"]}
            dropzoneProps={{ maxFiles: 1, disabled: isViewMode }}
            disabled={isViewMode}
          />
          <CustomNumberInput
            name="quotationAmount"
            control={form.control}
            label="Quotation Amount"
            placeholder="Enter amount from quotation"
            inputProps={{
              onChange: (e) => {
                const raw = Number(e.currentTarget.value.replace(/,/g, ""));
                setField("requestedCRF.requestedAmount", raw);
              },
              required: true,
              disabled: isViewMode,
            }}
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-slate-100 to-slate-50">
              <TableRow className="hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900 text-xs">
                  Budget Reference
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-xs">
                  Category
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Approved Budget
                </TableHead>
                {/* <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Remaining
                </TableHead> */}
                <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Utilized
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Balance
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Requested
                </TableHead>
                <TableHead className="font-bold text-slate-900 text-xs text-center">
                  Projected
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="text-slate-900 p-2">
                  <CustomSingleSelectInput
                    name="requestedCRF.budgetId"
                    control={form.control}
                    label=""
                    disabled={isViewMode}
                    findAllWithCursorGQL={
                      modelAPI.BudgetGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.BudgetGQL.findUnique}
                    defaultValueId={getValue("requestedCRF.budgetId") ?? ""}
                    placeholder="Search budget..."
                    searchPlaceholder="Search budget..."
                    emptySelectedMessage="Budget already selected."
                    emptyMessage="No budget found."
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? {
                            name: {
                              contains: search,
                              mode: "insensitive",
                            },
                          }
                          : undefined,
                      },
                    })}
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { budgetRefNo?: string; id?: string };
                      return {
                        label: d.budgetRefNo ?? "",
                        value: d.id ?? "",
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { budgetRefNo?: string; id?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.budgetRefNo ?? "",
                        value: d.data.id ?? "",
                      };
                    }}
                  />
                </TableCell>
                <TableCell className="text-slate-900 p-2">
                  <CustomSingleSelectInput
                    name="requestedCRF.categoryId"
                    control={form.control}
                    label=""
                    disabled={Boolean(form.watch("requestedCRF.budgetId")) || isViewMode}
                    findAllWithCursorGQL={
                      modelAPI.CategoryGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                    defaultValueId={getValue("requestedCRF.categoryId") ?? ""}
                    placeholder="Search category..."
                    searchPlaceholder="Search category..."
                    emptySelectedMessage="Category already selected."
                    emptyMessage="No category found."
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? {
                            name: {
                              contains: search,
                              mode: "insensitive",
                            },
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
                <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.approvedAmount"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the amount from the form"
                  />
                </TableCell>
                {/* <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.remainingAmount"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the total from the form"
                  />
                </TableCell> */}
                <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.utilizedBudget"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the total from the form"
                  />
                </TableCell>
                <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.newBalanceAmmount"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the total from the form"
                  />
                </TableCell>
                <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.requestedAmount"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the total from the form"
                  />
                </TableCell>
                <TableCell className="text-slate-900 p-2">
                  <CustomNumberInput
                    name="requestedCRF.projectedBudget"
                    control={form.control}
                    label=""
                    inputProps={{ disabled: true }}
                    placeholder="Auto-calculated the total from the form"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          <Card className="border-l-4 border-l-primary">
            <CardHeader
              className="pb-3 cursor-pointer"
              onClick={() => setMobileExpanded(!mobileExpanded)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Budget Selection</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {form.watch("requestedCRF.budgetId")
                      ? "Budget selected"
                      : "Select a budget"}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileExpanded ? "rotate-180" : ""
                    }`}
                />
              </div>
            </CardHeader>

            {mobileExpanded && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Budget Reference
                  </label>
                  <CustomSingleSelectInput
                    name="requestedCRF.budgetId"
                    control={form.control}
                    label=""
                    disabled={Boolean(
                      form.watch("requestedCRF.categoryId")
                    )}
                    findAllWithCursorGQL={
                      modelAPI.BudgetGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.BudgetGQL.findUnique}
                    defaultValueId={getValue("requestedCRF.budgetId") ?? ""}
                    placeholder="Search budget..."
                    searchPlaceholder="Search budget..."
                    emptySelectedMessage="Budget already selected."
                    emptyMessage="No budget found."
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? {
                            name: {
                              contains: search,
                              mode: "insensitive",
                            },
                          }
                          : undefined,
                      },
                    })}
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { budgetRefNo?: string; id?: string };
                      return {
                        label: d.budgetRefNo ?? "",
                        value: d.id ?? "",
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { budgetRefNo?: string; id?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.budgetRefNo ?? "",
                        value: d.data.id ?? "",
                      };
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Category
                  </label>
                  <CustomSingleSelectInput
                    name="requestedCRF.categoryId"
                    control={form.control}
                    label=""
                    disabled={Boolean(form.watch("requestedCRF.budgetId"))}
                    findAllWithCursorGQL={
                      modelAPI.CategoryGQL.findAllWithCursor
                    }
                    findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                    defaultValueId={getValue("requestedCRF.categoryId") ?? ""}
                    placeholder="Search category..."
                    searchPlaceholder="Search category..."
                    emptySelectedMessage="Category already selected."
                    emptyMessage="No category found."
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search
                          ? {
                            name: {
                              contains: search,
                              mode: "insensitive",
                            },
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
                </div>
              </CardContent>
            )}
          </Card>

          {/* Budget Stats Cards */}
          <div className="grid grid-cols-2 gap-2">
            {budgetStats.map((stat, idx) => (
              <Card key={idx} className="p-3">
                <p className="text-[10px] text-muted-foreground font-semibold mb-1">
                  {stat.label}
                </p>
                <p className={`text-sm font-bold ${stat.color}`}>
                  {formatCurrency(stat.value as number)}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Remarks Section */}
        <div className={`grid grid-cols-${1} gap-4`}>
          <CustomTextAreaInput
            name="requestedCRF.remark.notes"
            control={form.control}
            label="Remarks / Purpose"
            placeholder="Enter remarks or purpose for the budget request or if this is Construction In Progress related, indicate the project name and location here."
            inputProps={{
              disabled: isViewMode
            }}
          />

          {/* STATUS IS "For Finance Review" */}
          {
            actionType === "edit" && (!getValue("requestedCRF.budgetId") || isForFinance) && (
              <ProtectedComponent
                modelName={modelName}
                action="verification"
              >
                <CustomTextAreaInput
                  name="requestedCRF.remark.verificationNotes"
                  control={form.control}
                  label="Verification Notes"
                  placeholder="Enter all notes this are marked as a title of unbudgeted if the request is unbudgeted, and marked as Construction In Progress if the request is for construction in progress. For construction in progress, indicate the project name and location here."
                  inputProps={{
                    disabled: isViewMode,
                  }}
                />
              </ProtectedComponent>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default BudgetReferenceDetails;
