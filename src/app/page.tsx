import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, NotebookPen, Package, PenLine, ShieldCheck, ShoppingCart, Sparkles, Truck } from "lucide-react";
import { books } from "@/data/books";
import { accessories } from "@/data/accessories";
import { classes } from "@/data/classes";
import { BookGrid } from "@/components/books/BookCard";
import { ClassGrid } from "@/components/classes/ClassCard";
import { ContactForm } from "@/components/common/ContactForm";
import { SectionHeader } from "@/components/common/SectionHeader";

const pathways = [
  { href: "/books", title: "Books", detail: "Textbooks, model papers & revision guides.", icon: BookOpen, decoration: "books" },
  { href: "/accessories", title: "Accessories", detail: "Everyday stationery & study essentials.", icon: PenLine, decoration: "accessories" },
  { href: "/classes", title: "Classes", detail: "Explore tuition classes & expert support.", icon: GraduationCap, decoration: "classes" },
];
export default function Home() {
  return <div className="commerce-home">
    <section className="commerce-hero" aria-labelledby="home-title">
      <div className="container commerce-hero-inner">
        <div className="commerce-hero-copy">
          <span className="commerce-pill"><GraduationCap size={19} /> YOUR LEARNING DESTINATION</span>
          <header className="header"><h1 id="home-title">Everything for<br /><span>brighter</span> learning.</h1><p>Educational books <span aria-hidden="true">·</span> Study accessories <span aria-hidden="true">·</span> Tuition classes</p></header>
          <div className="commerce-hero-actions"><Link href="/books" className="button primary">Explore Books <ArrowRight size={19} /></Link><Link href="/accessories" className="button secondary">Shop Accessories <ArrowRight size={18} /></Link></div>
          <div className="commerce-hero-promise"><span><ShieldCheck size={17} /> Carefully curated resources</span><span><ShoppingCart size={17} /> Easy cart enquiries</span></div>
        </div>
        <div className="commerce-hero-visual" aria-hidden="true"><div className="commerce-hero-ring commerce-hero-ring-one"/><div className="commerce-hero-ring commerce-hero-ring-two"/><Image className="commerce-hero-person" src="/images/hero-educator.png" alt="" width={760} height={736} priority sizes="(max-width: 700px) 80vw, 49vw" /><span className="commerce-float commerce-float-books"><BookOpen size={24}/> Books &amp;<br/>Study Materials</span><span className="commerce-float commerce-float-online"><span className="commerce-status-dot"/> Learn online<br/>or in person</span><span className="commerce-float commerce-float-accessories"><NotebookPen size={23}/> Study<br/>Accessories</span></div>
      </div>
    </section>
    <div className="commerce-shell">
      <section className="container commerce-offers" aria-labelledby="offers-title"><header className="header commerce-section-heading"><span className="eyebrow">EXPLORE</span><h2 id="offers-title">What we offer</h2><p>Find the right resources for every part of your study routine.</p></header><div className="commerce-offer-grid">{pathways.map(({href,title,detail,icon:Icon,decoration})=><Link className="commerce-offer-card" key={href} href={href}><span className={`commerce-offer-illustration ${decoration}`} aria-hidden="true"><Icon size={54} strokeWidth={1.45}/></span><span className="commerce-offer-text"><strong>{title}</strong><span>{detail}</span></span><span className="commerce-circle"><ArrowRight size={21}/></span></Link>)}</div></section>
      <section className="container commerce-featured" aria-labelledby="featured-title"><header className="header commerce-featured-intro"><span className="eyebrow">FEATURED BOOKS</span><h2 id="featured-title">Popular<br/>Study Books</h2><p>Explore helpful resources for your next exam, class or study session.</p><Link href="/books" className="button secondary">View all books <ArrowRight size={17}/></Link></header><div className="commerce-featured-products"><BookGrid items={books.filter((book)=>book.featured).slice(0,4)}/></div></section>
      <section className="container commerce-accessories" aria-labelledby="accessories-title"><header className="header commerce-section-heading"><span className="eyebrow">STUDY ESSENTIALS</span><h2 id="accessories-title">Little things, big progress.</h2><p>Keep your desk ready for whatever comes next.</p></header><div className="commerce-accessories-layout"><div className="commerce-accessories-promo"><span className="commerce-accessories-icon" aria-hidden="true"><PenLine size={54}/></span><div><span className="eyebrow">MAKE SPACE TO LEARN</span><h3>Everything for a better study day.</h3><Link href="/accessories" className="button primary">Shop accessories <ArrowRight size={16}/></Link></div></div><div className="commerce-accessory-products"><BookGrid items={accessories.slice(0,2)}/></div></div></section>
      <section className="container commerce-classes" aria-labelledby="classes-title"><header className="header commerce-classes-heading"><span className="eyebrow">TUITION CLASSES</span><h2 id="classes-title">Learn with confidence.</h2><p>Discover available classes, meet educators and explore learning opportunities. Class listings are samples until verified.</p><Link href="/classes" className="button secondary">Explore classes <ArrowRight size={17}/></Link></header><div className="commerce-class-cards"><ClassGrid items={classes.filter((item)=>item.featured).slice(0,2)}/><Link href="/register-class" className="commerce-class-cta"><CalendarDays size={34} /><strong>Teach with us?</strong><span>List your class and connect with learners.</span><span className="commerce-circle"><ArrowRight size={21}/></span></Link></div></section>
      <div className="container commerce-lower"><section id="about" className="commerce-panel commerce-about" aria-labelledby="about-title"><header className="header"><span className="eyebrow">ABOUT</span><h2 id="about-title">More ways to<br/>learn and grow.</h2><p>Sandalu Weerasekara brings educational books, practical study accessories and class information together in one approachable place.</p></header><div className="commerce-about-decoration" aria-hidden="true"><Sparkles size={48}/></div><Link href="/books" className="button secondary">Explore our store <ArrowRight size={17}/></Link></section><section id="contact" className="commerce-panel commerce-contact" aria-labelledby="contact-title"><div><header className="header"><span className="eyebrow">CONTACT</span><h2 id="contact-title">Get in touch</h2><p>Need help choosing a book, placing an enquiry or finding a class? Send us a message.</p></header><div className="commerce-contact-points"><span><Package size={18}/> Book &amp; accessory enquiries</span><span><Truck size={18}/> Order details on request</span></div></div><ContactForm/></section></div>
      <p className="container commerce-disclaimer">Demo storefront: products, teachers, events and availability are illustrative. No online payment is collected; purchase enquiries are handled through WhatsApp.</p>
    </div>
  </div>;
}
