
export function Header() {
  return <header className="site-header"><div className="header-inner"><a href="/pg-finds/" className="brand" aria-label="PG Finds home"><span className="brand-mark" aria-hidden="true">pf<span>↗</span></span>PG Finds</a><span className="header-credit"><span className="hn-mark">Y</span> Curated from Hacker News</span><nav aria-label="Main navigation"><a href="https://albedolab.hashnode.dev/building-pg-finds" target="_blank" rel="noreferrer">How we made it <span aria-hidden="true">↗</span></a></nav></div></header>;
}
export function Footer() {
  return <footer className="site-footer"><div><a href="/pg-finds/" className="footer-brand">PG Finds<span>↗</span></a><p>PostgreSQL resources, discovered on Hacker News.</p></div><div><p>Discovered through <a href="https://news.ycombinator.com/">Hacker News</a>.</p><p>Independent project · <a href="/pg-finds/method/">Sources & methodology</a></p></div></footer>;
}
export function Arrow() { return <span aria-hidden="true">↗</span>; }
