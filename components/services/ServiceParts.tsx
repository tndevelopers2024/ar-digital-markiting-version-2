import type { ReactNode } from "react";
export function ServiceHeading({title,children}:{label?:string;title:string;children?:ReactNode}) {
 return <div className="bespoke-heading"><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
export function WindowBar({title}:{title:string}) { return <div className="demo-window-bar"><span className="demo-dots"><i/><i/><i/></span><span>{title}</span><span aria-hidden="true">↗</span></div>; }
export function MiniLabel({children}:{children:ReactNode}) { return <span className="demo-label">{children}</span>; }
export function Journey({items}:{items:readonly {title:string;copy:string}[]}) { return <ol className="bespoke-journey">{items.map((item,i)=><li key={item.title}><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></li>)}</ol>; }
