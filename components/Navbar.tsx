"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const links = [{ id: "trabajo", label: "Proyectos" }, { id: "servicios", label: "Servicios" }, { id: "sobre-mi", label: "Sobre mí" }, { id: "contacto", label: "Hablemos" }];
  useEffect(() => {
    function close(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const awayFromTop = y > 2;
      setScrolled(awayFromTop);
      if (awayFromTop) setOpen(false);
      let current = "";
      for (const id of ["trabajo", "servicios", "sobre-mi", "contacto"]) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .4) current = id;
      }
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const showTop = !scrolled;
  const showBottom = scrolled;
  return <>
    <div className="header-space"><header className={`header scroll-header${showTop ? " is-visible" : ""}`} aria-hidden={!showTop} inert={!showTop}>
    <a className="logo" href="#" aria-label="José Tepáz — inicio"><span className="monogram">JT</span><span className="logotype">José Tepáz<span>Forward Deployed Engineer</span></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? "Cerrar" : "Menú"}</button>
    <nav id="navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Principal">
      <a href="#trabajo" onClick={() => setOpen(false)}>Proyectos</a>
      <a href="#servicios" onClick={() => setOpen(false)}>Servicios</a>
      <a href="#sobre-mi" onClick={() => setOpen(false)}>Sobre mí</a>
      <a className="nav-contact" href="#contacto" onClick={() => setOpen(false)}>Hablemos <span aria-hidden="true">↗</span></a>
    </nav>
    </header></div>
    <nav className={`bottom-navigation${showBottom ? " is-visible" : ""}`}  aria-label="Navegación de secciones" aria-hidden={!showBottom} inert={!showBottom}>
      {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>{link.label}</a>)}
    </nav>
  </>;
}
