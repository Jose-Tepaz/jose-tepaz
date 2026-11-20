import Chrome from '@/components/site/Chrome'
import Hero from '@/components/site/Hero'
import Clients from '@/components/site/Clients'
import Work from '@/components/site/Work'
import Problem from '@/components/site/Problem'
import Phrase from '@/components/site/Phrase'
import Process from '@/components/site/Process'
import Services from '@/components/site/Services'
import AI from '@/components/site/AI'
import Stack from '@/components/site/Stack'
import Audience from '@/components/site/Audience'
import About from '@/components/site/About'
import Contact from '@/components/site/Contact'

export default function Home() {
  return (
    <main className="site">
      <Chrome />
      <Hero />
      <Clients />
      <Work />
      <Problem />
      <Phrase />
      <Process />
      <Services />
      <AI />
      <Stack />
      <Audience />
      <About />
      <Contact />
    </main>
  )
}
