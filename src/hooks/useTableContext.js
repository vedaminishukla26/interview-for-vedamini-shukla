import { useContext } from 'react'
import TableContext from '../contexts/TableContext.jsx'

export const useTableContext = () => {
  const ctx = useContext(TableContext)
  if (!ctx) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return ctx
}

export default useTableContext 