// components/ProtectedRoute.tsx
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import React, { useEffect } from 'react'

const ProtectedRoute = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const router = useRouter()
    const isAuthenticated = useSelector((state: RootState) => state.auth.status)

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default ProtectedRoute
