import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const errors=[];
const domain=process.env.NEXT_PUBLIC_SITE_URL;
try { const url=new URL(domain); if(url.protocol!=='https:'||url.hostname==='localhost'||url.hostname.endsWith('.example')||url.hostname==='your-domain.com') throw Error(); } catch {errors.push('Set NEXT_PUBLIC_SITE_URL to the real HTTPS domain.');}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.NEXT_PUBLIC_CONTACT_EMAIL||''))errors.push('Set the real NEXT_PUBLIC_CONTACT_EMAIL.');
if(!process.env.ENQUIRY_WEBHOOK_URL?.startsWith('https://')||!process.env.ENQUIRY_WEBHOOK_TOKEN)errors.push('Configure the approved HTTPS enquiry receiver and server token.');
if(process.env.NEXT_PUBLIC_SITE_INDEXABLE!=='true')errors.push('Search indexing is disabled. Enable it only for the approved public launch.');
if(errors.length){console.error('Launch configuration is incomplete:\n'+errors.map(e=>'• '+e).join('\n'));process.exitCode=1;}else console.log('Launch configuration is present. Complete the human checks in PRODUCTION.md before deployment.');
