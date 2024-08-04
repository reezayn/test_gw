'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FC, useEffect } from 'react'
import Logo from '@/assets/logo.png'
import { Button } from '../ui/button'

interface FormProps {
  handleClick: (e: any, data: any) => void
  handleGoogleLogin?: () => void
  dataFields: any
  btnTitle: string
  data?: any
}

const AuthForm: FC<FormProps> = ({
  handleClick,
  handleGoogleLogin,
  dataFields,
  btnTitle,
  data: filledData,
}) => {
  const [data, setData] = useState<any>(
    filledData
      ? filledData
      : dataFields.reduce(
          (acc: any, field: any) => ({
            ...acc,
            [field.name]: '',
          }),
          {}
        )
  )

  useEffect(() => {
    if (filledData) {
      setData(filledData)
    }
  }, [filledData])

  return (
    <>
      <form
        onSubmit={(e: any) => handleClick(e, data)}
        className="w-full flex flex-col items-center max-w-sm border rounded-3xl p-14 border-black bg-black text-white"
      >
        <div className="mb-5">
          <Image src={Logo} alt="Gurkha Warriors" className="w-20" />
        </div>
        <h1 className="font-semibold text-3xl mb-7 capitalize">
          {btnTitle === 'Login' ? 'login' : 'register'}
        </h1>
        {dataFields.map((field: any, index: number) => (
          <input
            key={index}
            className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            value={data[field.name]}
            onChange={(e) =>
              setData({
                ...data,
                [field.name]: e.target.value,
              })
            }
          />
        ))}

        {/* <Button onClick={handleGoogleLogin}>Login Via Google</Button> */}

        {(btnTitle.includes('Login') || btnTitle.includes('Register')) && (
          <p className="text-gray-300 text-xs flex w-full items-center justify-end gap-2 italic">
            {btnTitle === 'Login'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <Link
              href={btnTitle === 'Login' ? '/register' : '/login'}
              className="text-gurkhaGreen hover:text-gurkhaGreen/90 underline"
            >
              {btnTitle === 'Login' ? 'Register' : 'Login'}
            </Link>
          </p>
        )}
        <button className="capitalize mt-5 flex items-center justify-center bg-gurkhaGreen hover:bg-opacity-80 text-black font-bold py-2 px-8 rounded-3xl">
          {btnTitle.toUpperCase()}
        </button>
      </form>
      {handleGoogleLogin !== undefined ? (
        <div onClick={() => handleGoogleLogin()}>LoginViaGoogle</div>
      ) : (
        <></>
      )}
    </>
  )
}

export default AuthForm
