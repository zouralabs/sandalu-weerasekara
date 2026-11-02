"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";

const navigation = site.navigation.filter((item) => item.href !== "/register-class");
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);
  return (
    <header className="site-header reference-site-header" onKeyDown={(event) => {
      if (event.key === "Escape") { setMenuOpen(false); setSearchOpen(false); menuButton.current?.focus(); }
    }}>
      <div className="container reference-header-inner">
        <Link href="/" className="reference-brand" aria-label="Sandalu Weerasekara — home">
          <span className="reference-brand-mark" aria-hidden="true">SW</span>
          <span className="reference-brand-name">Sandalu<br />Weerasekara</span>
        </Link>
        <nav id="main-navigation" aria-label="Main navigation" className={`reference-nav ${menuOpen ? "is-open" : ""}`}>
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={item.href.startsWith("/#") ? undefined : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/")) ? "page" : undefined}>{item.label}</Link>)}
          <Link href="/register-class" className="reference-mobile-register" onClick={() => setMenuOpen(false)}>Register Class <ArrowRight size={17} /></Link>
        </nav>
        <div className="reference-header-actions">
          <button className="reference-icon-button reference-search-toggle" aria-label={searchOpen ? "Close search" : "Search site"} aria-controls="reference-header-search" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={20} /> : <Search size={20} />}</button>
          <Link href="/register-class" className="reference-register">Register Class <ArrowRight size={17} /></Link>
          <Link href="/cart" className="reference-icon-button reference-cart" aria-label={`View shopping cart, ${count} items`}><ShoppingCart size={21} />{count > 0 && <span className="reference-cart-count">{count}</span>}</Link>
          <button ref={menuButton} type="button" className="reference-icon-button reference-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <form id="reference-header-search" className={`reference-search-panel ${searchOpen ? "is-open" : ""}`} action="/search" role="search" hidden={!searchOpen}>
        <div className="container reference-search-inner"><label htmlFor="reference-search-input" className="sr-only">Search books, accessories and classes</label><Search aria-hidden="true" size={19} /><input ref={searchInput} id="reference-search-input" type="search" name="q" placeholder="Search books, accessories or classes…" required /><button type="submit" className="button primary">Search <ArrowRight size={16} /></button></div>
      </form>
    </header>
  );
}
