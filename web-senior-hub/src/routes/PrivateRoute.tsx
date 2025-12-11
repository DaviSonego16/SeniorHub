import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import type { JSX } from 'react/jsx-runtime'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}
