"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Search, ShoppingCart, X } from "lucide-react";
import { site } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { EnrollmentDialog } from "@/components/classes/EnrollmentDialog";

const navigation = site.navigation;
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
      if (event.key === "Escape" && !(event.target as HTMLElement).closest("dialog")) { setMenuOpen(false); setSearchOpen(false); menuButton.current?.focus(); }
    }}>
      <div className="container reference-header-inner">
        <Link href="/" className="reference-brand" aria-label={`${site.name} — home`}>
          <Image
            className="reference-brand-mark"
            src={site.logo}
            alt=""
            width={48}
            height={48}
          />
          <span className="reference-brand-name">{site.name}</span>
        </Link>
        <nav id="main-navigation" aria-label="Main navigation" className={`reference-nav ${menuOpen ? "is-open" : ""}`}>
          {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={item.href.startsWith("/#") ? undefined : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/")) ? "page" : undefined}>{item.label}</Link>)}
          <EnrollmentDialog className="reference-mobile-register" onOpen={() => setMenuOpen(false)} />
        </nav>
        <div className="reference-header-actions">
          <button className="reference-icon-button reference-search-toggle" aria-label={searchOpen ? "Close search" : "Search site"} aria-controls="reference-header-search" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={20} /> : <Search size={20} />}</button>
          <Link href="/cart" className="reference-icon-button reference-cart" aria-label={`View shopping cart, ${count} items`}><ShoppingCart size={21} />{count > 0 && <span className="reference-cart-count">{count}</span>}</Link>
          <EnrollmentDialog />
          <button ref={menuButton} type="button" className="reference-icon-button reference-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <form id="reference-header-search" className={`reference-search-panel ${searchOpen ? "is-open" : ""}`} action="/search" role="search" hidden={!searchOpen}>
        <div className="container reference-search-inner">
          <label htmlFor="reference-search-input" className="sr-only">Search books and accessories</label>
          <Search aria-hidden="true" size={19} />
          <input ref={searchInput} id="reference-search-input" type="search" name="q" placeholder="Search books or accessories…" autoComplete="off" required />
          <button type="submit" className="button primary">Search <ArrowRight size={16} /></button>
        </div>
      </form>
    </header>
  );
}
