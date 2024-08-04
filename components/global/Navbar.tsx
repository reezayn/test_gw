'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Home, Contact, User, Book } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { inputTailwindStyle } from '@/lib/constants'
import { FaSortDown } from 'react-icons/fa'
import { TbLogout } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { RiEyeFill } from 'react-icons/ri'
import Link from 'next/link'
import { AuthService } from '@/services'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '@/store/features/auth/authSlice'
import { RootState } from '@/store/store'
import { hideNavbarRoutes } from '@/constants'
import Image from 'next/image'
import Logo from '@/assets/logo.png'

const routes = [
  {
    name: 'home',
    path: '/',
    icon: Home,
    showInMenu: true,
  },
  {
    name: 'contact',
    path: '/contact',
    icon: Contact,
    showInMenu: true,
  },
  {
    name: 'profile',
    path: '/profile',
    icon: User,
    showInMenu: false,
  },
  {
    name: 'book',
    path: '/book',
    icon: Book,
    showInMenu: false,
  },
]

const Navbar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const authService = AuthService.getInstance()
  const [currentRoute, setCurrentRoute] = useState<string>('Home')
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state: RootState) => state.auth.status) // Access auth state

  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        if (userData) {
          console.log('userdata from google login: ', userData)
          setName(userData.name)
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((err) => {
        console.log('No user is logged in, ', err)
      })
  }, [])
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // useEffect(() => {
  //   authService
  //     .getUser()
  //     .then((res) => {
  //       console.log('res from getUser in navbar', res)
  //       setIsLoggedIn(true)
  //     })
  //     .catch((err) => {
  //       console.log('err from getUser in navbar', err)
  //       setIsLoggedIn(false)
  //     })
  // }, [isLoggedIn, pathname])

  useEffect(() => {
    const route = routes.find((route) => route.path === pathname)
    if (route) {
      setCurrentRoute(route.name)
    }
  }, [pathname])

  const handleNavigation = (path: string) => {
    router.push(path)
  }
  if (hideNavbarRoutes.includes(pathname)) {
    return
  }
  return (
    <>
      <div className="relative flex items-center justify-between h-20">
        <div className="absolute left-3 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`${inputTailwindStyle} hover:bg-transparent text-black hover:text-black rounded-full border-black hover:border-black w-28`}
              asChild
            >
              <Button
                variant="outline"
                className="flex z-10 items-center gap-x-1"
              >
                {currentRoute
                  ? currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)
                  : ''}
                <FaSortDown className="-mt-1" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-1 lg:ml-4 rounded-lg">
              <DropdownMenuGroup>
                {routes
                  .filter((route) => {
                    return route.showInMenu
                  })
                  .map((route) => (
                    <DropdownMenuItem
                      key={route.name}
                      onSelect={() => handleNavigation(route.path)}
                      className="cursor-pointer my-1"
                    >
                      <span>
                        {route.name.charAt(0).toUpperCase() +
                          route.name.slice(1)}
                      </span>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          id="logo"
          className="absolute inset-x-0 mx-auto font-bold uppercase text-2xl text-center"
        >
          <div className="flex items-center w-full justify-center">
            <Image
              onClick={() => router.push('/')}
              src={Logo}
              alt="GURKHA WARRIORS"
              className="w-14 mr-2 cursor-pointer"
            />
            <span onClick={() => router.push('/')} className="cursor-pointer">
              Gurkha Warriors
            </span>
          </div>
        </div>
        <div id="menu" className="absolute right-3 flex items-center gap-x-14">
          {isAuthenticated ? (
            <div className="flex items-center gap-x-3">
              <Button asChild className="rounded-full font-normal px-8">
                <Link href="/book">Book now</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`${inputTailwindStyle} hover:bg-transparent text-black hover:text-black rounded-full border-none hover:border-none`}
                  asChild
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-x-3"
                  >
                    <AiOutlineUser size={19} />{' '}
                    <span className="flex items-center gap-x-2">
                      {name}
                      <FaSortDown className="-mt-[5px]" size={16} />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push('/profile')}
                      className="cursor-pointer my-1 flex items-center gap-x-2"
                    >
                      <RiEyeFill size={20} /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        authService.logoutUser().then(
                          (res: any) => {
                            dispatch(logout())
                            router.push('/')
                          },
                          (err: any) => {
                            console.log(err)
                          }
                        )
                      }
                      className="cursor-pointer my-1 flex items-center gap-x-2"
                    >
                      <TbLogout size={20} /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-x-2">
              <Button asChild className="rounded-full font-normal px-8">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full font-normal px-8">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
