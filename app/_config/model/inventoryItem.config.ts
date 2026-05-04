import { InventoryItem } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = InventoryItem;
const ModelName = "InventoryItem";
const ListModelName = "Manage Inventory Item List";
const ListDescription = "Manage your Inventory Item effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
  {
    id: "id",
    header: "Id",
    accessorKey: "id",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "companyId",
    header: "CompanyId",
    accessorKey: "companyId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "departmentId",
    header: "DepartmentId",
    accessorKey: "departmentId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "categoryId",
    header: "CategoryId",
    accessorKey: "categoryId",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "quantityInStock",
    header: "QuantityInStock",
    accessorKey: "quantityInStock",
    meta: { searchable: false, type: "number" },
  },
  {
    id: "unitOfMeasure",
    header: "UnitOfMeasure",
    accessorKey: "unitOfMeasure",
    meta: { searchable: false, type: "string" },
  },
  {
    id: "remainingStock",
    header: "RemainingStock",
    accessorKey: "remainingStock",
    meta: { searchable: false, type: "number" },
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: "",
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "quantityInStock",
        label: "QuantityInStock",
        default: 0,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: "",
      },
      {
        key: "remainingStock",
        label: "RemainingStock",
        default: 0,
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
        key: "name",
        label: "Name",
        default: "",
      },
      {
        key: "description",
        label: "Description",
        default: "",
      },
      {
        key: "companyId",
        label: "CompanyId",
        default: "",
      },
      {
        key: "departmentId",
        label: "DepartmentId",
        default: "",
      },
      {
        key: "categoryId",
        label: "CategoryId",
        default: "",
      },
      {
        key: "quantityInStock",
        label: "QuantityInStock",
        default: 0,
      },
      {
        key: "unitOfMeasure",
        label: "UnitOfMeasure",
        default: "",
      },
      {
        key: "remainingStock",
        label: "RemainingStock",
        default: 0,
      },
      {
        key: "isActive",
        label: "IsActive",
        default: false,
      }
];

const exportColumns = [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "description", label: "Description" },
      { id: "companyId", label: "CompanyId" },
      { id: "departmentId", label: "DepartmentId" },
      { id: "categoryId", label: "CategoryId" },
      { id: "quantityInStock", label: "QuantityInStock" },
      { id: "unitOfMeasure", label: "UnitOfMeasure" },
      { id: "remainingStock", label: "RemainingStock" },
      { id: "isActive", label: "IsActive" },
      { id: "createdAt", label: "Created At" },
      { id: "updatedAt", label: "Updated At" }
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const inventoryItem = {
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
            name: row.name,
            description: row.description,
            companyId: row.companyId,
            departmentId: row.departmentId,
            categoryId: row.categoryId,
            quantityInStock: row.quantityInStock,
            unitOfMeasure: row.unitOfMeasure,
            remainingStock: row.remainingStock,
            isActive: row.isActive,
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
            id: row.id,
            name: row.name,
            description: row.description,
            companyId: row.companyId,
            departmentId: row.departmentId,
            categoryId: row.categoryId,
            quantityInStock: row.quantityInStock,
            unitOfMeasure: row.unitOfMeasure,
            remainingStock: row.remainingStock,
            isActive: row.isActive,
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;