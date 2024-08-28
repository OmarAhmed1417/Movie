import Head from 'next/head'
import '../../styles/globals.css'


export const metadata = {
  title: 'Movie Website',
  description: 'Enjoy a wonderful experience with OHM Movies',
}

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <Head>
<link rel="icon" href="/favicon." />  
      </Head>
      
      <body className="bg-black_color-black">
      
        {children}
        </body>
    </html>
  )
}
