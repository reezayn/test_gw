'use client'

import AuthForm from '@/components/auth/AuthForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import { AuthService } from '@/services'
import type { AuthType } from '@/types'
import { ID } from 'appwrite'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const authService = AuthService.getInstance()
  const router = useRouter()

  const handleClick = (e: any, data: AuthType) => {
    e.preventDefault()
    const { name, email, password } = data

    if (!name || !email || !password) {
      toast.error('Please fill all fields')
      return
    }
    const userId = ID.unique()
    authService.registerUser({ userId, name, email, password }).then(
      (res: any) => {
        router.push('/login')
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  return (
    <div className="h-screen bg-gurkhaGreen/60 w-full py-10 flex flex-col items-center justify-center gap-10">
      <AuthForm
        handleClick={handleClick}
        dataFields={[
          {
            name: 'name',
            type: 'text',
            placeholder: 'Name',
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
          },
        ]}
        btnTitle="Register"
      />
    </div>
  )
}

export default RedirectIfAuthenticated(RegisterPage)
