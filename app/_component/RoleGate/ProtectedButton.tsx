import { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "../../../components/ui/button"
import RoleGate from "./RoleGate"
import { LucideIcon } from "lucide-react"

type ProtectedButtonProps = {
  modelName: string
  action: string
  buttonProps?: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
  buttonName: string
  icon?: LucideIcon
}

const ProtectedButton = (props: ProtectedButtonProps) => {
  return (
    <RoleGate
      module={[`${props.modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
      resource={[`${props.modelName.toLowerCase()}`, '*']}
      action={[props.action, '*']}
    >

      <Button {...props.buttonProps}>
        {props.icon && <props.icon className="h-4 w-4" />}
        <span className="hidden sm:inline">{props.buttonName}</span>

      </Button>
    </RoleGate>
  )
}

export default ProtectedButton
