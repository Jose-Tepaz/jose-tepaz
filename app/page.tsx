import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Process from '@/components/Process'
import Services from '@/components/Services'
import ClientsMarquee from '@/components/ClientsMarquee'
import AIAutomation from '@/components/AIAutomation'
import ToolStack from '@/components/ToolStack'
import Audience from '@/components/Audience'
import ScrollPhrase from '@/components/ScrollPhrase'
import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ClientsMarquee />
      <Problem />
      <ScrollPhrase />
      <Process />
      <Services />
      <AIAutomation />
      <ToolStack />
      <Audience />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}
