import './globals.css'
import { Space_Grotesk, Bricolage_Grotesque } from 'next/font/google'
import Footer from '../components/Footer'
import LiveTicker from '../components/LiveTicker'
import CustomCursor from '../components/CustomCursor'
import AuthContext from '@/context/AuthContext'
import Navbar from '../components/Navbar'

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })

export const metadata = {
  title: 'BRUTALLYHONEST | No Feelings Spared',
  description: 'Enter your website. Get roasted instantly. The world\'s most brutally honest feedback engine.',
  openGraph: {
    title: 'BRUTALLYHONEST',
    description: 'No BS. Just Truth. Get your website roasted by AI.',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${space.variable} ${bricolage.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        <AuthContext>
          <CustomCursor />
          <LiveTicker />
          <div className="bg-scanline"></div>
          <Navbar />
          <div style={{ paddingTop: '121px' }}>
            {children}
          </div>
          <Footer />
        </AuthContext>
      </body>
    </html>
  )
}
