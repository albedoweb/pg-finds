import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: {default:'PG Finds — Curated from Hacker News', template:'%s · PG Finds'},
  description:'Useful PostgreSQL articles, projects, and guides discovered through Hacker News. Explore the sources, discussions, and story behind the collection.',
  icons:{icon:'/pg-finds/favicon.svg'},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c5500937997a4c069c9642743f20e830"}'
        />
      </body>
    </html>
  );
}
