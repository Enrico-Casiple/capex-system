
'use client'
import CustomSingleSelectInput from "@/components/Forms/Inputs/CustomSingleSelectInput"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { modelGQL } from "@/lib/api/crud.gql"
import { BudgetFindBy } from "@/lib/api/gql/Budget.gql"
import { Query, QueryBudgetFindByArgs } from "@/lib/generated/api/customHookAPI/graphql"
import { Request } from '@/lib/generated/api/customHookAPI/graphql';
import { useQuery } from "@apollo/client/react"
import { UseFormReturn } from "react-hook-form"

type BudgetReferenceDetailsProps = {
  form: UseFormReturn<Request>
}
const modelAPI = modelGQL

const BudgetReferenceDetails = ({ form }: BudgetReferenceDetailsProps) => {
   const findBudgetRefNo = form.watch("requestedBudget.budgetRefNo");
   const findBudgetReferences = useQuery<Pick<Query, "BudgetFindBy">, QueryBudgetFindByArgs>(BudgetFindBy, {
    variables: {
      input: {
        key: "budgetRefNo",
        value: findBudgetRefNo || "",

      }
    },
    skip: !findBudgetRefNo, // Skip query if no rowId or if action is 'create'
  })

  console.log("Budget Reference Details - Selected Budget Ref No:", findBudgetReferences.data)

  return (
     <section className='space-y-4'>
       <div className='flex items-center gap-3 pb-3 border-b'>
          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold'>
            II.
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Budget Reference Details</h3>
            <p className='text-xs text-muted-foreground mt-0.5'>Provide budget reference information</p>
          </div>
        </div>
        <div className='space-y-4'>
         

          {/* Budget Table */}
          <div className='border rounded-lg overflow-hidden'>
            <Table>
              <TableHeader className='bg-gradient-to-r from-slate-100 to-slate-50'>
                <TableRow className='hover:bg-slate-100'>
                  <TableHead className='font-bold text-slate-900'>Budget Reference</TableHead>
                  <TableHead className='font-bold text-slate-900'>Category</TableHead>
                  <TableHead className='font-bold text-slate-900'>Approved Budget</TableHead>
                  <TableHead className='font-bold text-slate-900'>Balance Amount</TableHead>
                  <TableHead className='font-bold text-slate-900'>Requested Amount</TableHead>
                  <TableHead className='font-bold text-slate-900'>Projected Balance</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                    <TableRow className='hover:bg-slate-50 transition-colors'>
                      <TableCell className='text-slate-900'>
                        <CustomSingleSelectInput
                            name={`requestedBudget.budgetRefNo`}
                            control={form.control}
                            label={``}
                            findAllWithCursorGQL={modelAPI.BudgetGQL.findAllWithCursor}
                            findUniqueGQL={modelAPI.BudgetGQL.findUnique}
                            defaultValueId={form.getValues(`requestedBudget.budgetRefNo`) ?? ""}
                            placeholder={`Search budget...`}
                            searchPlaceholder={`Search budget...`}
                            emptySelectedMessage={`Budget already selected.`}
                            emptyMessage={`No budget found.`}
                            cursorVariables={(search, cursor, take) => ({
                              cursorInput: {
                                cursor,
                                isActive: true,
                                take,
                                filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
                              },
                            })}
                            uniqueVariables={(id) => ({ id })}
                            mapOption={(data: unknown) => {
                              const d = data as { budgetRefNo?: string; };
                              return {
                                label: d.budgetRefNo ?? '',
                                value: d.budgetRefNo ?? '',
                              };
                            }}
                            mapDefaultOption={(data: unknown) => {
                              const d = data as {
                                data?: { budgetRefNo?: string;  };
                              };
                              if (!d?.data) return null;
                              return {
                                label: d.data.budgetRefNo ?? '',
                                value: d.data.budgetRefNo ?? '',
                              };
                            }}
                          />
                      </TableCell>
                      <TableCell className='text-slate-900'>
                        {
                          findBudgetReferences?.data?.BudgetFindBy?.data ? (
                            <span>{findBudgetReferences.data.BudgetFindBy.data.categoryId}</span>
                          ) : (
                            <CustomSingleSelectInput
                              name={`requestedBudget.categoryId`}
                              control={form.control}
                              label={``}
                              findAllWithCursorGQL={modelAPI.CategoryGQL.findAllWithCursor}
                              findUniqueGQL={modelAPI.CategoryGQL.findUnique}
                              defaultValueId={form.getValues(`requestedBudget.connectOrCreate.create.categoryId`) ?? ""}
                              placeholder={`Search category...`}
                              searchPlaceholder={`Search category...`}
                              emptySelectedMessage={`Category already selected.`}
                              emptyMessage={`No category found.`}
                              cursorVariables={(search, cursor, take) => ({
                                cursorInput: {
                                  cursor,
                                  isActive: true,
                                  take,
                                  filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
                                },
                              })}
                              uniqueVariables={(id) => ({ id })}
                              mapOption={(data: unknown) => {
                                const d = data as { id?: string; name?: string; userName?: string; email?: string };
                                return {
                                  label: d.name ?? d.userName ?? d.email ?? '',
                                  value: d.id ?? '',
                                };
                              }}
                              mapDefaultOption={(data: unknown) => {
                                const d = data as {
                                  data?: { id?: string; name?: string; userName?: string; email?: string };
                                };
                                if (!d?.data) return null;
                                return {
                                  label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                                  value: d.data.id ?? '',
                                };
                              }}
                            />
                          )
                        }

                      </TableCell>
                      <TableCell className='text-slate-900'>-</TableCell>
                      <TableCell className='text-slate-900'>-</TableCell>
                      <TableCell className='text-slate-900'>-</TableCell>
                      <TableCell className='text-slate-900'>-</TableCell>
                    </TableRow>
                  </TableBody>
            </Table>
          </div>
          <div>Remarks / Purpose</div>
        </div>
      </section>
  )
}

export default BudgetReferenceDetails
