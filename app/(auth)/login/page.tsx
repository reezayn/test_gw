'use client'

import AuthForm from '@/components/auth/AuthForm'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import { AuthService } from '@/services'
import { login, logout } from '@/store/features/auth/authSlice'
import { AuthType } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const authService = AuthService.getInstance()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (e: any, data: AuthType) => {
    e.preventDefault()
    const { email, password } = data

    if (!email || !password) {
      toast.error('Please fill all fields')
      return
    }
    authService.loginUser(data).then(
      (res: any) => {
        toast.success('Login successfull!!')
        authService.getUser().then((userData) => {
          if (userData) {
            console.log('userdata from normal login: ', userData)
            dispatch(login({ userData }))
            router.push('/')
          } else {
            dispatch(logout())
            router.push('/login')
          }
        })
      },
      (err: any) => {
        console.log(err)
        if (err.message && err.message.toLowerCase().includes('invalid')) {
          toast.error(
            'Invalid Email or Password. Please enter correct email or password.'
          )
        } else {
          toast.error(err.message)
        }
      }
    )
  }
  const handleGoogleLogin = () => {
    try {
      authService.loginViaGoogle()
      authService.getUser().then((userData) => {
        if (userData) {
          console.log('userdata from google login: ', userData)
          dispatch(login({ userData }))
          toast.success('google batai vako hai login chai')
          // router.push('/')
        } else {
          dispatch(logout())
          toast.error('google le manena yar, email password nai use gara')
          router.push('/login')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="h-screen bg-gurkhaGreen/60 w-full py-10 flex flex-col items-center justify-center gap-10">
      <AuthForm
        handleClick={handleClick}
        handleGoogleLogin={handleGoogleLogin}
        dataFields={[
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
        btnTitle="Login"
      />
    </div>
  )
}

export default RedirectIfAuthenticated(LoginPage)
