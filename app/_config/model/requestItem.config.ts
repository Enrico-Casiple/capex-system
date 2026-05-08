import { RequestItem } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = RequestItem;
const ModelName = "RequestItem";
const ListModelName = "Manage Request Item List";
const ListDescription = "Manage your Request Item effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "requestId",
    header: "RequestId",
    accessorKey: "requestId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "statusId",
    header: "StatusId",
    accessorKey: "statusId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isPriceNeed",
    header: "IsPriceNeed",
    accessorKey: "isPriceNeed",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "itemId",
    header: "ItemId",
    accessorKey: "itemId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "categoryId",
    header: "CategoryId",
    accessorKey: "categoryId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "quantity",
    header: "Quantity",
    accessorKey: "quantity",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "unitOfMeasure",
    header: "UnitOfMeasure",
    accessorKey: "unitOfMeasure",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "vatPercentage",
    header: "VatPercentage",
    accessorKey: "vatPercentage",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "isInclusiveVat",
    header: "IsInclusiveVat",
    accessorKey: "isInclusiveVat",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "unitPrice",
    header: "UnitPrice",
    accessorKey: "unitPrice",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "amountGrossOfVat",
    header: "AmountGrossOfVat",
    accessorKey: "amountGrossOfVat",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "totalPrice",
    header: "TotalPrice",
    accessorKey: "totalPrice",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "attachmentUrl",
    header: "AttachmentUrl",
    accessorKey: "attachmentUrl",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "isActive",
    header: "IsActive",
    accessorKey: "isActive",
    meta: { searchable: false, type: "boolean" },
  },
  {
    id: "createdAt",
    header: "CreatedAt",
    accessorKey: "createdAt",
    meta: { searchable: false, type: "date" },
  },
  {
    id: "updatedAt",
    header: "UpdatedAt",
    accessorKey: "updatedAt",
    meta: { searchable: false, type: "date" },
  }
];

const previewColumnsCreate: PreviewColumn<Model>[] = [
      {
        key: "requestId",
        label: "RequestId",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "isPriceNeed",
        label: "IsPriceNeed",
        default: false,
      },
      {
        key: "itemId",
        label: "ItemId",
        default: null,
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "quantity",
        label: "Quantity",
        default: null,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: null,
      },
      {
        key: "vatPercentage",
        label: "VatPercentage",
        default: null,
      },
      {
        key: "isInclusiveVat",
        label: "IsInclusiveVat",
        default: false,
      },
      {
        key: "unitPrice",
        label: "UnitPrice",
        default: null,
      },
      {
        key: "amountGrossOfVat",
        label: "AmountGrossOfVat",
        default: null,
      },
      {
        key: "totalPrice",
        label: "TotalPrice",
        default: null,
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: null },
      {
        key: "requestId",
        label: "RequestId",
        default: null,
      },
      {
        key: "statusId",
        label: "StatusId",
        default: null,
      },
      {
        key: "isPriceNeed",
        label: "IsPriceNeed",
        default: false,
      },
      {
        key: "itemId",
        label: "ItemId",
        default: null,
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: null,
      },
      {
        key: "description",
        label: "Description",
        default: null,
      },
      {
        key: "quantity",
        label: "Quantity",
        default: null,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: null,
      },
      {
        key: "vatPercentage",
        label: "VatPercentage",
        default: null,
      },
      {
        key: "isInclusiveVat",
        label: "IsInclusiveVat",
        default: false,
      },
      {
        key: "unitPrice",
        label: "UnitPrice",
        default: null,
      },
      {
        key: "amountGrossOfVat",
        label: "AmountGrossOfVat",
        default: null,
      },
      {
        key: "totalPrice",
        label: "TotalPrice",
        default: null,
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: null,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "requestId", label: "RequestId" },
      { id: "statusId", label: "StatusId" },
      { id: "isPriceNeed", label: "IsPriceNeed" },
      { id: "itemId", label: "ItemId" },
      { id: "categoryId", label: "CategoryId" },
      { id: "description", label: "Description" },
      { id: "quantity", label: "Quantity" },
      { id: "unitOfMeasure", label: "UnitOfMeasure" },
      { id: "vatPercentage", label: "VatPercentage" },
      { id: "isInclusiveVat", label: "IsInclusiveVat" },
      { id: "unitPrice", label: "UnitPrice" },
      { id: "amountGrossOfVat", label: "AmountGrossOfVat" },
      { id: "totalPrice", label: "TotalPrice" },
      { id: "attachmentUrl", label: "AttachmentUrl" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const requestItem = {
  modelName: ModelName,
  listName: ListModelName,
  description: ListDescription,
  extraColumns: ExtraColumns,
  initialColumnVisibility: {
    id: false,
    createdAt: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: [],

  transformRowCreate: async (row: Model) => {
    return {
            requestId: row.requestId ? String(row.requestId) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            isPriceNeed: row.isPriceNeed != null ? Boolean(row.isPriceNeed) : null,
            itemId: row.itemId ? String(row.itemId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            description: row.description ? String(row.description) : null,
            quantity: row.quantity ? Number(row.quantity) : null,
            unitOfMeasure: row.unitOfMeasure ? String(row.unitOfMeasure) : null,
            vatPercentage: row.vatPercentage ? Number(row.vatPercentage) : null,
            isInclusiveVat: row.isInclusiveVat != null ? Boolean(row.isInclusiveVat) : null,
            unitPrice: row.unitPrice ? Number(row.unitPrice) : null,
            amountGrossOfVat: row.amountGrossOfVat ? Number(row.amountGrossOfVat) : null,
            totalPrice: row.totalPrice ? Number(row.totalPrice) : null,
            attachmentUrl: row.attachmentUrl ? String(row.attachmentUrl) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id != null && row.id !== "" ? String(row.id) : null,
            requestId: row.requestId ? String(row.requestId) : null,
            statusId: row.statusId ? String(row.statusId) : null,
            isPriceNeed: row.isPriceNeed != null ? Boolean(row.isPriceNeed) : null,
            itemId: row.itemId ? String(row.itemId) : null,
            categoryId: row.categoryId ? String(row.categoryId) : null,
            description: row.description ? String(row.description) : null,
            quantity: row.quantity ? Number(row.quantity) : null,
            unitOfMeasure: row.unitOfMeasure ? String(row.unitOfMeasure) : null,
            vatPercentage: row.vatPercentage ? Number(row.vatPercentage) : null,
            isInclusiveVat: row.isInclusiveVat != null ? Boolean(row.isInclusiveVat) : null,
            unitPrice: row.unitPrice ? Number(row.unitPrice) : null,
            amountGrossOfVat: row.amountGrossOfVat ? Number(row.amountGrossOfVat) : null,
            totalPrice: row.totalPrice ? Number(row.totalPrice) : null,
            attachmentUrl: row.attachmentUrl ? String(row.attachmentUrl) : null,
            isActive: row.isActive != null ? Boolean(row.isActive) : null,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;