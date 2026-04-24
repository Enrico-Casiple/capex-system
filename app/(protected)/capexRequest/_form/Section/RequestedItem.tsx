'use client';

import useToast from "@/app/_hooks/useToast";
import CustomCheckbox from "@/components/Forms/Inputs/CustomCheckbox";
import CustomImportInput from "@/components/Forms/Inputs/CustomImportInput";
import CustomNumberInput from "@/components/Forms/Inputs/CustomNumberInput";
import CustomTextInput from "@/components/Forms/Inputs/CustomTextInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PackagePlus, RotateCcw, Trash2, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Control, useFieldArray, UseFormReturn } from "react-hook-form";

// --- Types & Constants ---

interface RequestItem {
  description: string;
  quantity: number;
  unitOfMeasure: string;
  vatPercentage: number;
  isInclusiveVat: boolean;
  unitPrice: number;
  totalPrice: number;
  amountGrossOfVat: number;
  attachmentUrl?: string;
  statusId?: string | number | null;
}

export interface RequestedItemFormValues {
  requestItems: RequestItem[];
}

interface RequestedItemProps {
  form: UseFormReturn<RequestedItemFormValues>;
}

const EMPTY_ITEM: RequestItem = {
  description: "",
  quantity: 1,
  unitOfMeasure: "pcs",
  vatPercentage: 12,
  isInclusiveVat: false,
  unitPrice: 0,
  totalPrice: 0,
  amountGrossOfVat: 0,
  attachmentUrl: "",
  statusId: null,
};

// --- Utilities ---

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

const calculateItemAmounts = (qty: number, price: number, vatRate: number, isInclusive: boolean) => {
  const vatFactor = 1 + vatRate / 100;
  let net = 0;
  let gross = 0;

  if (isInclusive) {
    gross = qty * price;
    net = gross / vatFactor;
  } else {
    net = qty * price;
    gross = net * vatFactor;
  }

  return {
    net: Number(net.toFixed(2)),
    gross: Number(gross.toFixed(2)),
  };
};

// --- Mobile Card Item Component ---

const MobileItemCard = ({
  index,
  field,
  form,
  remove,
  fieldsLength
}: {
  index: number;
  field: any;
  form: UseFormReturn<RequestedItemFormValues>;
  remove: (index: number) => void;
  fieldsLength: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const values = form.watch(`requestItems.${index}`);

  return (
    <Card className="mb-3 border-l-4 border-l-primary shadow-sm">
      <CardContent className="p-3 space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-600 mb-1">Description</p>
            <p className="text-sm font-semibold truncate text-slate-900">
              {values.description || "No description"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Qty: <span className="font-semibold">{values.quantity}</span> •
              UOM: <span className="font-semibold">{values.unitOfMeasure}</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="px-2 h-auto"
            type="button"
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-semibold">NET</p>
            <p className="text-sm font-bold text-slate-900">{formatCurrency(values.totalPrice || 0)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground font-semibold">GROSS</p>
            <p className="text-sm font-bold text-primary">{formatCurrency(values.amountGrossOfVat || 0)}</p>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="space-y-3 pt-3 border-t animate-in fade-in duration-200">
            {/* Quotation & Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Quotation</label>
              <CustomImportInput<RequestedItemFormValues>
                name={`requestItems.${index}.attachmentUrl`}
                label=""
                control={form.control}
                setError={form.setError}
                clearErrors={form.clearErrors}
                maxSizeMB={10}
                allowedExtensions={['pdf']}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Description</label>
              <CustomTextInput
                name={`requestItems.${index}.description`}
                control={form.control}
                placeholder="Enter specifications..."
                label=""
              />
            </div>

            {/* Qty, UOM, Price */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">Qty</label>
                <CustomNumberInput
                  name={`requestItems.${index}.quantity`}
                  control={form.control}
                  inputProps={{ min: 1 }}
                  label=""
                  placeholder="Qty"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">UOM</label>
                <CustomTextInput
                  name={`requestItems.${index}.unitOfMeasure`}
                  control={form.control}
                  placeholder="UOM"
                  label=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">Price</label>
                <CustomNumberInput
                  name={`requestItems.${index}.unitPrice`}
                  control={form.control}
                  inputProps={{ min: 0 }}
                  label=""
                  placeholder="Price"
                />
              </div>
            </div>

            {/* VAT Settings */}
            <div className="bg-slate-50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-bold text-slate-600">Tax Settings</p>
              <div className="grid grid-cols-3 gap-2 items-end">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-semibold text-slate-600">VAT Rate %</label>
                  <CustomNumberInput
                    name={`requestItems.${index}.vatPercentage`}
                    control={form.control}
                    inputProps={{ min: 0, max: 100 }}
                    label=""
                    placeholder="VAT %"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">Inclusive</label>
                  <div className="flex justify-center pt-1">
                    <CustomCheckbox
                      name={`requestItems.${index}.isInclusiveVat`}
                      control={form.control}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculated Amounts */}
            <div className="bg-blue-50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-bold text-slate-600">Calculated Amounts</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">Total (Net)</label>
                  <CustomNumberInput
                    name={`requestItems.${index}.totalPrice`}
                    control={form.control}
                    label=""
                    inputProps={{
                      disabled: true,
                      className: "bg-transparent text-center border-none font-semibold shadow-none cursor-default",
                    }}
                    placeholder="Auto-calculated"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600">Total (Gross)</label>
                  <CustomNumberInput
                    name={`requestItems.${index}.amountGrossOfVat`}
                    control={form.control}
                    label=""
                    inputProps={{
                      disabled: true,
                      className: "bg-transparent text-center border-none font-bold text-primary shadow-none cursor-default",
                    }}
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <Button
              variant="destructive"
              size="sm"
              disabled={fieldsLength === 1}
              onClick={() => remove(index)}
              className="w-full gap-2"
            >
              <Trash2 className="h-4 w-4" /> Remove Item
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- Main Component ---

const RequestedItem = ({ form }: RequestedItemProps) => {
  const toast = useToast();

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control as unknown as Control<RequestedItemFormValues>,
    name: "requestItems",
  });

  React.useEffect(() => {
    const subscription = form.watch((_, { name }) => {
      if (!name?.startsWith("requestItems")) return;

      const match = name.match(/requestItems\.(\d+)\.(quantity|unitPrice|vatPercentage|isInclusiveVat)/);
      if (!match) return;

      const index = parseInt(match[1], 10);
      const values = form.getValues(`requestItems.${index}`);

      const { net, gross } = calculateItemAmounts(
        values.quantity || 0,
        values.unitPrice || 0,
        values.vatPercentage || 0,
        values.isInclusiveVat || false
      );

      form.setValue(`requestItems.${index}.totalPrice`, net, { shouldDirty: true });
      form.setValue(`requestItems.${index}.amountGrossOfVat`, gross, { shouldDirty: true });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const currentItems = form.watch("requestItems") || [];
  const totalNet = currentItems.reduce((acc, item) => acc + (item.totalPrice ?? 0), 0);
  const totalGross = currentItems.reduce((acc, item) => acc + (item.amountGrossOfVat ?? 0), 0);
  const totalVat = totalGross - totalNet;

  const handleAddItem = () => {
    const items = form.getValues("requestItems");
    const isLastItemInvalid = items.some((item) => (
      !item.description?.trim() ||
      item.quantity < 1 ||
      item.unitPrice < 0 ||
      !item.unitOfMeasure?.trim()
    ));

    if (isLastItemInvalid) {
      toast.error({
        message: "Validation Error",
        description: "Please complete the current item details before adding another.",
      });
      return;
    }
    append({ ...EMPTY_ITEM });
  };

  return (
    <section className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0">
            III
          </div>
          <div>
            <h3 className="text-base font-semibold leading-tight">Requested Items</h3>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              Automated VAT calculation for procurement requests.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            onClick={() => replace([{ ...EMPTY_ITEM }])}
            className="text-muted-foreground hover:text-destructive gap-1.5"
            title="Reset all items"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button
            variant="default"
            type="button"
            size="sm"
            onClick={handleAddItem}
            className="gap-1.5"
            title="Add new item"
          >
            <PackagePlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Item</span>
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {[
          { label: "Items", value: fields.length, variant: "secondary" as const },
          { label: "Net Total", value: formatCurrency(totalNet) },
          { label: "VAT", value: formatCurrency(totalVat), className: "text-amber-600" },
          {
            label: "Gross Total",
            value: formatCurrency(totalGross),
            className: "text-primary font-bold",
            bg: "bg-primary/5",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-1 rounded-lg border px-2 md:px-3 py-2 transition-colors hover:border-primary/50 ${stat.bg || "bg-slate-50"}`}
          >
            <span className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</span>
            {stat.variant ? (
              <Badge variant={stat.variant} className="text-xs font-semibold w-fit">
                {stat.value}
              </Badge>
            ) : (
              <span className={`text-xs md:text-sm font-semibold ${stat.className || "text-slate-800"}`}>
                {stat.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-xl border overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100 uppercase tracking-wider text-[10px] font-bold text-slate-600">
                <TableHead className="w-[100px]">Attachement</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="w-[80px] text-center">Qty</TableHead>
                <TableHead className="w-[100px]">UOM</TableHead>
                <TableHead className="w-[140px] text-center">Unit Price</TableHead>
                <TableHead colSpan={2} className="text-center border-x bg-slate-200/50">
                  Tax Settings
                </TableHead>
                <TableHead colSpan={2} className="text-center border-x bg-blue-100/30">
                  Totals
                </TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
              <TableRow className="bg-slate-50 text-[10px] text-muted-foreground border-b-2">
                <TableHead colSpan={5} />
                <TableHead className="w-[80px] text-center bg-slate-50/50">Rate %</TableHead>
                <TableHead className="w-[80px] text-center bg-slate-50/50">Inclusive</TableHead>
                <TableHead className="w-[130px] text-center bg-blue-50/50">Net</TableHead>
                <TableHead className="w-[130px] text-center bg-blue-50/50">Gross</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="align-top pt-3">
                    <CustomImportInput<RequestedItemFormValues>
                      name={`requestItems.${index}.attachmentUrl`}
                      label=""
                      control={form.control}
                      setError={form.setError}
                      clearErrors={form.clearErrors}
                      maxSizeMB={10}
                      allowedExtensions={['pdf']}
                    />
                  </TableCell>

                  <TableCell className="align-top pt-3">
                    <CustomTextInput
                      name={`requestItems.${index}.description`}
                      control={form.control}
                      placeholder="Enter specifications..."
                      label=""
                    />
                  </TableCell>

                  <TableCell className="align-top pt-3">
                    <CustomNumberInput
                      name={`requestItems.${index}.quantity`}
                      control={form.control}
                      inputProps={{ min: 1 }}
                      label=""
                      placeholder="Qty"
                    />
                  </TableCell>

                  <TableCell className="align-top pt-3">
                    <CustomTextInput
                      name={`requestItems.${index}.unitOfMeasure`}
                      control={form.control}
                      placeholder="UOM"
                      label=""
                    />
                  </TableCell>

                  <TableCell className="align-top pt-3">
                    <CustomNumberInput
                      name={`requestItems.${index}.unitPrice`}
                      control={form.control}
                      inputProps={{ min: 0 }}
                      label=""
                      placeholder="Price"
                    />
                  </TableCell>

                  <TableCell className="align-top pt-3 bg-slate-50/30">
                    <CustomNumberInput
                      name={`requestItems.${index}.vatPercentage`}
                      control={form.control}
                      inputProps={{ min: 0, max: 100 }}
                      label=""
                      placeholder="VAT %"
                    />
                  </TableCell>
                  <TableCell className="align-middle bg-slate-50/30 py-3">
                    <div className="flex justify-center px-3 py-3">
                      <CustomCheckbox
                        name={`requestItems.${index}.isInclusiveVat`}
                        control={form.control}
                        inputProps={{
                          style: {
                            width: '20px',
                            height: '20px'
                          }
                        }}
                      />
                    </div>
                  </TableCell>

                  <TableCell className="align-top pt-3 bg-blue-50/20">
                    <CustomNumberInput
                      name={`requestItems.${index}.totalPrice`}
                      control={form.control}
                      label=""
                      inputProps={{
                        disabled: true,
                        className:
                          "bg-transparent text-center border-none font-medium shadow-none cursor-default",
                      }}
                      placeholder="Auto-calculated"
                    />
                  </TableCell>
                  <TableCell className="align-top pt-3 bg-blue-50/20">
                    <CustomNumberInput
                      name={`requestItems.${index}.amountGrossOfVat`}
                      control={form.control}
                      label=""
                      inputProps={{
                        disabled: true,
                        className:
                          "bg-transparent text-center border-none font-bold text-primary shadow-none cursor-default",
                      }}
                      placeholder="Auto-calculated"
                    />
                  </TableCell>

                  <TableCell className="align-middle text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter className="bg-slate-100 border-t-2">
              <TableRow>
                <TableCell colSpan={7} className="text-right text-xs font-bold text-slate-600 py-5">
                  GRAND TOTALS
                </TableCell>
                <TableCell className="bg-blue-100/30 text-center">
                  <div className="text-sm font-semibold">{formatCurrency(totalNet)}</div>
                  <div className="text-[9px] text-muted-foreground font-bold">TOTAL NET</div>
                </TableCell>
                <TableCell className="bg-blue-100/30 text-center">
                  <div className="text-sm font-bold text-primary">{formatCurrency(totalGross)}</div>
                  <div className="text-[9px] text-muted-foreground font-bold">TOTAL GROSS</div>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {fields.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">No items added yet</p>
            </CardContent>
          </Card>
        ) : (
          fields.map((field, index) => (
            <MobileItemCard
              key={field.id}
              index={index}
              field={field}
              form={form}
              remove={remove}
              fieldsLength={fields.length}
            />
          ))
        )}

        {/* Mobile Summary Footer */}
        <Card className="mt-4 border-t-4 border-t-primary shadow-sm">
          <CardContent className="p-3 space-y-3">
            <p className="text-xs font-bold text-slate-600">SUMMARY</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground">Net Total</p>
                <p className="text-sm font-semibold">{formatCurrency(totalNet)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground">VAT</p>
                <p className="text-sm font-semibold text-amber-600">{formatCurrency(totalVat)}</p>
              </div>
              <div className="col-span-2 pt-2 border-t space-y-1">
                <p className="text-[10px] text-muted-foreground">Gross Total</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(totalGross)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RequestedItem;