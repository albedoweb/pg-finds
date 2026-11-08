import Catalog from '../components/catalog';
import { Header, Footer } from '../components/site-chrome';
import items from '../content/catalog.json';
export default function Home() {
  return <><Header/><main id="main"><Catalog items={items} initialCategory="All topics"/></main><Footer/></>;
}
