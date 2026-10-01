"use client";
import Link from "next/link";
export default function ErrorPage({reset}:{error:Error & {digest?:string};reset:()=>void}) {return <main id="main" className="status-page"><h1>Let’s try that again.</h1><p>The page couldn’t load. Your browser can retry it without losing your place.</p><div><button className="button button-primary" onClick={reset}>Try again</button><Link className="button button-secondary" href="/">Back to home</Link></div></main>}
