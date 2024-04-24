import './globals.css'

import { ReactNode } from 'react'
import { getMetadata, getGlobal } from '@/cms'
import { cookies } from 'next/headers'
import { useGlobalTypography } from '@/store/globalTypographyStore'
import SetupClientComponent from '@/components/SetupClientComponent'
import MainNavigation from '@/cms/globals/MainNavigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ searchParams }: any) {
  return await getMetadata('pages', 'home', { searchParams })
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const locale = cookies().get('locale')?.value ?? 'en'

  const [globalTypography, mainNavigation] = await Promise.all([
    getGlobal('globalTypography', { searchParams: { depth: '1', locale } }),
    getGlobal('mainNavigation', { searchParams: { depth: '1', locale } }),
  ])

  useGlobalTypography.setState(globalTypography)

  return (
    <html lang={locale}>
      <body>
        <SetupClientComponent globalTypography={globalTypography} />
        <MainNavigation {...mainNavigation} />
        <main className='mx-auto max-w-[1440px] bg-white laptop:mt-8'>{children}</main>
      </body>
    </html>
  )
}
