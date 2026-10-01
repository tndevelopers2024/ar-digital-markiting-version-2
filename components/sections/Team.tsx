import { Section } from "@/components/ui/Section";
const roles = [
  ["Strategy", "A clear direction", "Connect your business goals, audience, and priorities before choosing what to build."],
  ["Design", "A recognisable experience", "Bring your identity and customer journey together through thoughtful visual design."],
  ["Development", "Built around real needs", "Turn the design into a responsive website, store, or application people can use."],
  ["Marketing", "Reach the right people", "Connect search, advertising, and content to the actions that matter to your business."],
  ["Content", "Make the message clear", "Shape useful words, visuals, and video around what your audience needs to understand."],
];
export function Team() {
 return <Section id="team" className="team section-container batch-section"><div className="section-heading" data-reveal><div><h2 id="team-heading">Different skills.<br/><span>One shared direction.</span></h2></div><p className="section-intro">A connected approach brings the right expertise to each stage of your project.</p></div><div className="production-roles">{roles.map(([role,title,description])=><article key={role}><span>{role}</span><h3>{title}</h3><p>{description}</p></article>)}</div></Section>;
}
