import { Request } from "@/lib/generated/api/customHookAPI/graphql"
import { UseFormReturn } from "react-hook-form";


interface RequestedItemProps {
  form: UseFormReturn<Request>
}
const RequestedItem = ({ form }: RequestedItemProps) => {

}

export default RequestedItem