import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SingIn } from '@/components/SingIn'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jam-juree',
})

export const metadata = {
  title: 'Spacetime',
  description: 'Cápsula do tempo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('spacetime_session')

  return (
    <html lang="pt-br">
      <body
        className={`
          ${roboto.variable} 
          ${baiJamjuree.variable} 
          mx-auto max-w-[1860px] bg-gray-900 font-sans text-gray-100
        `}
      >
        <main className="grid min-h-screen grid-cols-1 responsive:grid-cols-2">
          <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover p-8 py-16 responsive:items-start responsive:px-28">
            <div className="absolute right-0 top-1/2 z-0 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red-700 opacity-70 blur-full"></div>
            <div className="absolute bottom-0 right-1 top-0 w-2 bg-stripes"></div>
            {isAuthenticated ? <Profile /> : <SingIn />}
            <Hero />
            <Copyright />
          </div>
          <div className="relative flex min-h-screen flex-1 flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover p-10 responsive:max-h-screen responsive:p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
