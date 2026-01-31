"use client";

import Link from "next/link";
import {
  Home,
  UtensilsCrossed,
  PlusCircle,
  Bell,
  Bookmark,
  Users,
  User,
  Search,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { icon: Home, label: "Home", href: "/", isActive: true },
  { icon: UtensilsCrossed, label: "Buka", href: "/buka", isActive: false },
  { icon: PlusCircle, label: "Upload", href: "/upload", isActive: false },
  { icon: Bell, label: "Notification", href: "/notifications", isActive: false },
  { icon: Bookmark, label: "Saved", href: "/saved", isActive: false },
  { icon: Users, label: "Community", href: "/community", isActive: false },
  { icon: User, label: "Profile", href: "/profile", isActive: false },
];

const footerLinks = [
  { label: "Company", href: "https://localbuka.com/" },
  { label: "Program", href: "/program" },
  { label: "Terms & Policies", href: "/terms" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {/* Logo */}
          {/* Left: Logo + Brand Name */}
            <Link href='/' className='flex items-center gap-2'>
              <span 
                className='text-xl md:text-2xl text-white font-normal'
                style={{ fontFamily: 'var(--font-hakuna), sans-serif' }}
              >
                LocalBuka
              </span>
              <Image
                src='/images/localBuka_logo.png'
                alt='LocalBuka'
                width={40}
                height={40}
                className='h-8 w-8 rounded-full'
                priority
              />
            </Link>

        {/* Search */}
        <div className="sidebar-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-item ${item.isActive ? "nav-item-active" : ""}`}
            >
              <item.icon size={22} strokeWidth={item.isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <footer className="sidebar-footer">
        {footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className="footer-link">
            {link.label}
          </Link>
        ))}
        <span className="footer-copyright">© 2025 Localbuka</span>
      </footer>
    </aside>
  );
}
