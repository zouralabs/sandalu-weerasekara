import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, NotebookPen, PenLine, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { books } from "@/data/books";
import { classes } from "@/data/classes";
import { BookCard } from "@/components/books/BookCard";
import { ClassCard } from "@/components/classes/ClassCard";
import { ContentSlider } from "@/components/home/ContentSlider";

const pathways = [
  { href: "/classes", title: "Classes", detail: "Physical and online Accounting classes.", icon: GraduationCap, decoration: "classes" },
  { href: "/books", title: "Books", detail: "Textbooks, model papers & revision guides.", icon: BookOpen, decoration: "books" },
  { href: "/accessories", title: "Accessories", detail: "Everyday stationery & study essentials.", icon: PenLine, decoration: "accessories" },
];
export default function Home() {
  return <div className="commerce-home">
    <section className="commerce-hero" aria-labelledby="home-title">
      <div className="container commerce-hero-inner">
        <div className="commerce-hero-copy">
          <span className="commerce-pill"><GraduationCap size={19} /> The Best Accounting Supporter in the Town</span>
          <header className="header"><h1 id="home-title">Every <span>Account</span><br />has a Story.</h1><p>Educational books</p></header>
          <div className="commerce-hero-actions"><Link href="/classes" className="button primary">Explore Classes <ArrowRight size={19} /></Link><Link href="/books" className="button secondary">Explore Books <ArrowRight size={18} /></Link></div>
          <div className="commerce-hero-promise"><span><ShieldCheck size={17} /> Carefully curated resources</span><span><ShoppingCart size={17} /> Easy cart enquiries</span></div>
        </div>
        <div className="commerce-hero-visual" aria-hidden="true"><div className="commerce-hero-ring commerce-hero-ring-one"/><div className="commerce-hero-ring commerce-hero-ring-two"/><Image className="commerce-hero-person" src="/images/hero-educator.png" alt="" width={760} height={736} priority sizes="(max-width: 700px) 80vw, 49vw" /><span className="commerce-float commerce-float-books"><BookOpen size={24}/> Books &amp;<br/>Study Materials</span><span className="commerce-float commerce-float-online"><span className="commerce-status-dot"/> Sandalu<br/>Weerasekara</span><span className="commerce-float commerce-float-accessories"><NotebookPen size={23}/> Study<br/>Accessories</span><span className="commerce-float commerce-float-classes"><GraduationCap size={24}/><span className="commerce-float-classes-copy"><small>CLASSES</small><strong>A/L &amp; O/L</strong></span></span></div>
      </div>
    </section>
    <div className="commerce-shell">
      <section className="container commerce-trust-strip" aria-label="Store benefits">
        <div><ShieldCheck size={22}/><span><strong>Curated learning resources</strong><small>Selected for Sri Lankan students</small></span></div>
        <div><ShoppingCart size={22}/><span><strong>Simple WhatsApp ordering</strong><small>Confirm your order directly</small></span></div>
        <div><Truck size={22}/><span><strong>Islandwide delivery</strong><small>Get study materials delivered</small></span></div>
      </section>
      <section className="container commerce-offers" aria-labelledby="offers-title"><header className="header commerce-section-heading"><span className="eyebrow">EXPLORE</span><h2 id="offers-title">What we offer</h2><p>Find the right resources for every part of your study routine.</p></header><div className="commerce-offer-grid">{pathways.map(({href,title,detail,icon:Icon,decoration})=><Link className="commerce-offer-card" key={href} href={href}><span className={`commerce-offer-illustration ${decoration}`} aria-hidden="true"><Icon size={54} strokeWidth={1.45}/></span><span className="commerce-offer-text"><strong>{title}</strong><span>{detail}</span></span><span className="commerce-circle"><ArrowRight size={21}/></span></Link>)}</div></section>
      <section className="container commerce-featured" aria-labelledby="featured-title">
        <header className="header commerce-featured-intro">
          <span className="eyebrow">THE BOOKSHELF</span>
          <h2 id="featured-title">Books for your next big step.</h2>
          <p>Model papers and workbooks to make every study session count.</p>
          <Link href="/books" className="button secondary">View all books <ArrowRight size={17}/></Link>
        </header>
        <div className="commerce-featured-products">
          <ContentSlider
            id="featured-books-track"
            itemLabel="book"
            label="Featured books"
            variant="books"
          >
            {books.map((book) => <BookCard key={book.id} book={book} />)}
          </ContentSlider>
        </div>
      </section>
      <section className="container commerce-classes" aria-labelledby="classes-title">
        <header className="header commerce-classes-heading">
          <div>
            <span className="eyebrow">LEARN WITH GUIDANCE</span>
            <h2 id="classes-title">Find your class.</h2>
            <p>Choose a Sinhala or English batch, online or in person.</p>
          </div>
          <Link href="/classes" className="button secondary">Explore more <ArrowRight size={17}/></Link>
        </header>
        <div className="commerce-class-cards">
          <ContentSlider
            id="featured-classes-track"
            itemLabel="class"
            label="Classes"
            variant="classes"
          >
            {classes.map((item) => <ClassCard key={item.id} item={item} />)}
          </ContentSlider>
        </div>
      </section>
      <section className="container commerce-book-info" aria-label="Book author and publisher">
        <div className="author-card">
          <Image
            src="/images/author.png"
            alt="Sandalu Isiwara Weerasekara"
            width={300}
            height={290}
            sizes="(max-width: 600px) 100px, 140px"
            className="author-portrait"
          />
          <div className="author-copy">
            <span className="eyebrow">AUTHOR</span>
            <strong>සඳළු ඉසිවර වීරසේකර</strong>
            <span>Sandalu Isiwara Weerasekara</span>
          </div>
        </div>
        <div className="publisher-card">
          <div className="publisher-artwork">
            <Image
              src="/images/logo/publisher.jpeg"
              alt="Sihina Prakashana artwork"
              width={520}
              height={520}
              className="publisher-logo"
            />
          </div>
          <div className="publisher-copy">
            <span className="eyebrow">PUBLISHER</span>
            <strong>සිහින ප්‍රකාශන</strong>
            <span>Sihina Prakashana</span>
          </div>
        </div>
      </section>
      <section className="container commerce-news" aria-labelledby="latest-news-title">
        <header className="header commerce-news-heading">
          <div><span className="eyebrow">LATEST NEWS</span><h2 id="latest-news-title">Updates &amp; announcements</h2></div>
        </header>
      </section>
    </div>
  </div>;
}
