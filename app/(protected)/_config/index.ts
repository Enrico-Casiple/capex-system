import { UserScalarFieldEnumSchema } from "@/lib/generated/zod/prisma-zod-types"


export const listConfig = {
  user: {
    modelName: "User",
    description: "Manage your users effectively with our user management system. View, edit, and organize user information seamlessly.",
    extraColumns: UserScalarFieldEnumSchema.options.map((option) => ({
      id: option,
      header: option.charAt(0).toUpperCase() + option.slice(1),
      accessorKey: option,
    })),
    initialColumnVisibility: {},
    initialFilter: {},
    showActions: true,
  }
}