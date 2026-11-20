import Image from 'next/image'
import { skills } from '@/lib/site-content'
import { Reveal, SecHead } from './ui'

export default function About() {
  return (
    <section id="sobre-mi" data-theme="light" data-section="sobre-mi" className="sec sec-light about">
      <div className="wrap">
        <SecHead n="10" label="SOBRE MÍ" note="Guatemala" />

        <div className="about-grid">
          <Reveal className="about-photo">
            <Image
              src="/img/profile.jpeg"
              alt="José Tepáz"
              fill
              sizes="(min-width: 900px) 40vw, 100vw"
              className="about-img"
            />
            <div className="about-cap">
              <strong>José Tepáz</strong>
              <span>Guatemala</span>
            </div>
          </Reveal>

          <div>
            <Reveal as="h2" className="display big">
              Me integro a tu equipo <span className="blue">hasta que funciona.</span>
            </Reveal>
            <Reveal as="p" className="about-p" delay={0.1}>
              Soy José Tepáz, Forward Deployed Engineer con más de 6 años llevando soluciones a producción dentro de los equipos de mis clientes. He trabajado con empresas en Guatemala, Latinoamérica, Estados Unidos y Europa, desde startups en etapa temprana hasta empresas consolidadas.
            </Reveal>
            <Reveal as="p" className="about-p about-p2" delay={0.15}>
              Diseño, desarrollo y dirijo equipos, solo o acompañando al tuyo, apoyándome en IA y automatización para acelerar cada etapa. Mi valor está en entender a la vez el problema del negocio y la tecnología, y en responder por el resultado en producción.
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="chips chips-light">
                {skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
