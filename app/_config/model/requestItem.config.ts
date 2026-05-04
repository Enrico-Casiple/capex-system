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
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "isPriceNeed",
        label: "IsPriceNeed",
        default: false,
      },
      {
        key: "itemId",
        label: "ItemId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "quantity",
        label: "Quantity",
        default: 0,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: "",
      },
      {
        key: "vatPercentage",
        label: "VatPercentage",
        default: 0,
      },
      {
        key: "isInclusiveVat",
        label: "IsInclusiveVat",
        default: false,
      },
      {
        key: "unitPrice",
        label: "UnitPrice",
        default: 0,
      },
      {
        key: "amountGrossOfVat",
        label: "AmountGrossOfVat",
        default: 0,
      },
      {
        key: "totalPrice",
        label: "TotalPrice",
        default: 0,
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: "",
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
      { key: "id", label: "ID", default: "" },
      {
        key: "requestId",
        label: "RequestId",
        default: "",
      },
      {
        key: "statusId",
        label: "StatusId",
        default: "",
      },
      {
        key: "isPriceNeed",
        label: "IsPriceNeed",
        default: false,
      },
      {
        key: "itemId",
        label: "ItemId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "quantity",
        label: "Quantity",
        default: 0,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: "",
      },
      {
        key: "vatPercentage",
        label: "VatPercentage",
        default: 0,
      },
      {
        key: "isInclusiveVat",
        label: "IsInclusiveVat",
        default: false,
      },
      {
        key: "unitPrice",
        label: "UnitPrice",
        default: 0,
      },
      {
        key: "amountGrossOfVat",
        label: "AmountGrossOfVat",
        default: 0,
      },
      {
        key: "totalPrice",
        label: "TotalPrice",
        default: 0,
      },
      {
        key: "attachmentUrl",
        label: "AttachmentUrl",
        default: "",
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
            requestId: row.requestId,
            statusId: row.statusId,
            isPriceNeed: row.isPriceNeed,
            itemId: row.itemId,
            categoryId: row.categoryId,
            description: row.description,
            quantity: row.quantity,
            unitOfMeasure: row.unitOfMeasure,
            vatPercentage: row.vatPercentage,
            isInclusiveVat: row.isInclusiveVat,
            unitPrice: row.unitPrice,
            amountGrossOfVat: row.amountGrossOfVat,
            totalPrice: row.totalPrice,
            attachmentUrl: row.attachmentUrl,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            requestId: row.requestId,
            statusId: row.statusId,
            isPriceNeed: row.isPriceNeed,
            itemId: row.itemId,
            categoryId: row.categoryId,
            description: row.description,
            quantity: row.quantity,
            unitOfMeasure: row.unitOfMeasure,
            vatPercentage: row.vatPercentage,
            isInclusiveVat: row.isInclusiveVat,
            unitPrice: row.unitPrice,
            amountGrossOfVat: row.amountGrossOfVat,
            totalPrice: row.totalPrice,
            attachmentUrl: row.attachmentUrl,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;