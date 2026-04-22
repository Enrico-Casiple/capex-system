import { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "../../../components/ui/button"
import RoleGate from "./RoleGate"

type ProtectedButtonProps = {
  modelName: string
  action: string
  buttonProps?: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
  buttonName: string
}

const ProtectedButton = (props: ProtectedButtonProps) => {
  return (
    <RoleGate
      module={[`${props.modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
      resource={[`${props.modelName.toLowerCase()}`, '*']}
      action={[props.action, '*']}
    >
     <Button {...props.buttonProps}>{props.buttonName}</Button>
    </RoleGate>
  )
}

export default ProtectedButton
