import CustomNumberInput from "@/components/Forms/Inputs/CustomNumberInput";
import CustomTextInput from "@/components/Forms/Inputs/CustomTextInput";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Control, useFieldArray, UseFormReturn } from "react-hook-form";

interface RequestItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  attachmentUrl?: string;
  statusId?: string | number | null;
}

export interface RequestedItemFormValues {
  requestItems: RequestItem[];
}

interface RequestedItemProps {
  form: UseFormReturn<RequestedItemFormValues>;
}
const RequestedItem = ({ form }: RequestedItemProps) => {
  console.log("form", form)
  // I Need The Field Array to be here because I need to use the append and remove function to add and remove items from the array
  const requestedItemsFieldArray = useFieldArray<RequestedItemFormValues, "requestItems", "id">({
    control: form.control as unknown as Control<RequestedItemFormValues>,
    name: "requestItems",
  })

  const handleAddItem = () => {
    requestedItemsFieldArray.append({
      description: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      attachmentUrl: "",
      statusId: null,
    }); // Append an empty item, adjust the default values as needed
  }

  const handleRemoveItem = (index: number) => {
    // Remain At least one item in the array, if there is only one item left, do not remove it
    if (requestedItemsFieldArray.fields.length > 1) {
      requestedItemsFieldArray.remove(index);
    }
  }


  React.useEffect(() => {

    // Compute the total price whenever quantity or unit price changes for any item
    const subscription = form.watch((value, { name }) => {
      if (name && name.startsWith("requestItems")) {
        const indexMatch = name.match(/requestItems\.(\d+)\.(quantity|unitPrice)/);
        if (indexMatch) {
          const index = parseInt(indexMatch[1], 10);
          const quantity = form.getValues(`requestItems.${index}.quantity`);
          const unitPrice = form.getValues(`requestItems.${index}.unitPrice`);
          const totalPrice = (quantity ?? 0) * (unitPrice ?? 0);
          form.setValue(`requestItems.${index}.totalPrice`, Number(totalPrice.toFixed(2) ?? 0), { shouldDirty: true, shouldTouch: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, requestedItemsFieldArray.fields]) // Watch for changes in the fields array to trigger re-render when items are added or removed

  const calculateTotal = () => {
    const items = form.watch()["requestItems"];
    return items.reduce((total, item) => total + (item.totalPrice ?? 0), 0);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(amount);
  }
  return <section className='space-y-4'>
    <div className="flex items-center gap-3 pb-3 border-b">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold">
        III.
      </div>
      <div className="flex justify-between w-full align-middle">
        <div>
          <h3 className="text-lg font-semibold">Requested Items</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Provide requested item information
          </p>
        </div>
        <Button variant="outline" size="sm" type="button" onClick={handleAddItem}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
    </div >
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-slate-100 to-slate-50">
            <TableRow className="hover:bg-slate-100">
              <TableHead className="font-bold text-slate-900 w-[100px]">
                Attachement / Supporting Document
              </TableHead>
              <TableHead className="font-bold text-slate-900 w-[500px]">
                Item Description
              </TableHead>
              <TableHead className="font-bold text-slate-900 w-[100px]">
                Quantity
              </TableHead>
              <TableHead className="font-bold text-slate-900 w-[100px]">
                Unit Price
              </TableHead>
              <TableHead className="font-bold text-slate-900 w-[100px]">
                Total Price
              </TableHead>
              <TableHead className="font-bold text-slate-900 w-[50px]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              requestedItemsFieldArray.fields.map((field, index) => (
                <TableRow className="hover:bg-slate-50 transition-colors" key={field.id}>
                  <TableCell className="text-slate-900">{field.attachmentUrl}</TableCell>
                  <TableCell className="text-slate-900">
                    <CustomTextInput
                      name={`requestItems.${index}.description`}
                      control={form.control}
                      label=""
                      placeholder="Enter item description"
                      inputProps={{
                        maxLength: 500,
                        minLength: 5,
                        required: true,
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-slate-900">
                    <CustomNumberInput
                      name={`requestItems.${index}.quantity`}
                      control={form.control}
                      label={``}
                      placeholder={`Quantity`}
                      inputProps={{
                        min: 1,
                        required: true,
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-slate-900">
                    <CustomNumberInput
                      name={`requestItems.${index}.unitPrice`}
                      control={form.control}
                      label={``}
                      placeholder={`Unit Price`}
                      inputProps={{
                        min: 1,
                        required: true
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-slate-900">
                    <CustomNumberInput
                      name={`requestItems.${index}.totalPrice`}
                      control={form.control}
                      label={``}
                      placeholder={`Total Price`}
                      inputProps={{
                        min: 1,
                        disabled: true,
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-slate-900">
                    <Button variant="ghost" size="sm" type="button" onClick={() => handleRemoveItem(index)}
                      className={`ml-2 ${requestedItemsFieldArray.fields.length === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-bold text-slate-900">
                Total:
              </TableCell>
              <TableCell className="font-bold text-slate-900">
                {formatCurrency(calculateTotal())}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  </section>
}

export default RequestedItem
