import { useListContext } from '@/app/_context/ListContext/ListProvider'
import React from 'react'


const TableBodyWrapper = () => {
  const { returnQuery, cursorKey } = useListContext()
  return (
    <div>TableBodyWrapper</div>
  )
}

export default TableBodyWrapper