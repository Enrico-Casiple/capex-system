import RoleGate from "./RoleGate"

type ProtectedComponentProps = {
  modelName: string
  action: string
  children: React.ReactNode
}

const ProtectedComponent = (props: ProtectedComponentProps) => {
  return (
    <RoleGate
      module={[`${props.modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
      action={[props.action, '*']}
    >
      {props.children}
    </RoleGate>
  )
}

export default ProtectedComponent
