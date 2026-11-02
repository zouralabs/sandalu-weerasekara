import { accessories } from "@/data/accessories";
import { BookGrid } from "@/components/books/BookCard";
export const metadata = {title:"Accessories | Sandalu Weerasekara",description:"Browse study accessories and stationery."};
export default function AccessoriesPage(){return <main className="container section"><header className="header sw-page-header"><span className="eyebrow">THE STUDY ESSENTIALS</span><h1>Accessories</h1><p>Practical accessories for a better study routine. Product listings are illustrative until real stock is added.</p></header><BookGrid items={accessories}/></main>}
