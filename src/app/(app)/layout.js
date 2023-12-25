import '../globals.css'
import Header from '@/components/Header'
import { getServerSession } from 'next-auth'
import {Lato} from 'next/font/google'
import { authOptions } from '../api/auth/[...nextauth]/route'
import {redirect} from "next/navigation";

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {



  return (
    <html lang="en">
    <body className={lato.className}>
          {children}
    </body>
  </html>
  )
}
