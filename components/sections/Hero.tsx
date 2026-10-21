import { config } from "@/lib/config";
import styles from "./HeroButtons.module.css";
import { Button } from "@/components/ui/Button";
export function Hero() {
  const hero = config.hero;
  return <section id="hero" className="hero section-container" aria-labelledby="hero-heading">
    <div className="hero-copy">
      <h1 id="hero-heading">{hero.lines.map((line, i) => <span className={`hero-line ${i === 2 ? "accent-line" : ""}`} key={line}><span>{line}</span></span>)}</h1>
      <p className="hero-description hero-enter">{hero.description}</p>
      <div className="hero-actions hero-enter"><Button href={hero.primary.href} interactive={false} className={styles.staticButton}>{hero.primary.label}</Button><Button href={hero.secondary.href} secondary interactive={false} className={styles.staticButton}>{hero.secondary.label}</Button></div>
      <div className="hero-capabilities hero-enter"><span>Brand &amp; design</span><span>Web &amp; apps</span><span>Marketing &amp; AI</span></div>
    </div>
    <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/></div>
  </section>;
}
