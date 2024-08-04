import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StoreProvider from '@/components/global/StoreProvider'
import Head from 'next/head'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gurkha Warriors',
  description: 'Be brave, be a gurkha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href='@/assets/logo.png' type="image/png" />
      </Head>
      <body className={`${poppins.className} bg-gray-100 `}>
        <StoreProvider>
          <Navbar />
          <div className="">
            <ToastContainer />
            {children}
          </div>
          <div className="px-3">
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
