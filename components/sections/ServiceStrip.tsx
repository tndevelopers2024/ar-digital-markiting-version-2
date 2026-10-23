import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./ServiceStrip.module.css";

const services: { label: string; icon: IconName }[] = [
  { label: "Search visibility", icon: "search" },
  { label: "Paid campaigns", icon: "chart" },
  { label: "Social storytelling", icon: "social" },
  { label: "Web experiences", icon: "code" },
  { label: "E-commerce growth", icon: "bag" },
  { label: "Brand strategy", icon: "document" },
];
export function ServiceStrip() {
  return <section className={styles.wrapper} aria-label="Connected digital marketing services">
    <div className={styles.strip}><div className={styles.window}><div className={styles.track}>
      {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {services.map(service => <span className={styles.item} key={service.label}><Icon name={service.icon} /><span>{service.label}</span></span>)}
      </div>)}
    </div></div></div>
  </section>;
}
