import type { NextConfig } from "next";
const nextConfig: NextConfig = {
 // Allow the LAN hostname used for local previews to load dev chunks and HMR.
 allowedDevOrigins: ["192.168.1.6"],
 poweredByHeader: false,
 async redirects() {
  return [
   { source: "/projects", destination: "/services/digital-marketing", permanent: true },
   { source: "/projects/:slug", destination: "/services/digital-marketing", permanent: true },
  ];
 },
 async headers() {
  return [{source:"/:path*",headers:[
   {key:"X-Content-Type-Options",value:"nosniff"},
   {key:"X-Frame-Options",value:"DENY"},
   {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
   {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
  ]}];
 },
};
export default nextConfig;
