import { ClerkProvider } from '@clerk/nextjs'
import { Raleway } from 'next/font/google'
import { Header } from '@/components/header'
import '../styles/globals.css'
import { TrpcProvider } from '@/utils/trpc-client'
import { Background } from '../components/background'

const font = Raleway({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Twoned',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={font.className}>
        <body className="overflow-x-hidden">
          <TrpcProvider>
            <Header />
            {children}
            <Background />
          </TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
