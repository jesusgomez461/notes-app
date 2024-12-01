import React from 'react'

export interface PropsProtectedRoute {
  isAllowed: boolean
  children?: React.ReactNode
  redirectTo?: string
}
