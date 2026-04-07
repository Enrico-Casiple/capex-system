import React from 'react'

type ProtectedAuthLayoutProps = {
  children: React.ReactNode
}

const ProtectedAuthLayout = (props: ProtectedAuthLayoutProps) => {
  return (
    <div>{props.children}</div>
  )
}

export default ProtectedAuthLayout