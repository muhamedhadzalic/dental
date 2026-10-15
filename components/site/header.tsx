'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BookButton } from '@/components/booking/book-button';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { useI18n, type Lang } from '@/lib/i18n';
import { LogoMark } from './logo';

/** BS lives at "/", EN at "/en" – the toggle links to the same page in the other language. */
export function LangToggle() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || '/';
  const base = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const hrefFor = (l: Lang) => (l === 'bs' ? base : base === '/' ? '/en' : '/en' + base);
  const opt = (l: Lang, label: string) => {
    const on = lang === l;
    return (
      <a
        href={hrefFor(l)}
        hrefLang={l}
        lang={l}
        aria-current={on ? 'true' : undefined}
        className={`flex h-9 min-w-11 items-center justify-center rounded-full text-[13px] font-bold no-underline ${
          on ? 'bg-primary !text-white' : 'bg-transparent !text-ink'
        }`}
      >
        {label}
      </a>
    );
  };
  return (
    <div role="group" aria-label={t.langGroup} className="flex rounded-full bg-stone p-1">
      {opt('bs', 'BS')}
      {opt('en', 'EN')}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['#usluge', t.nav1],
    ['#tim', t.nav2],
    ['#nervozni', t.nav3],
    ['#kontakt', t.nav4],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-white/90 backdrop-blur-md backdrop-saturate-[1.4]">
      <div className="wrap flex h-[76px] items-center justify-between gap-5">
        <a href="#top" className="flex min-w-0 items-center gap-3 !text-primary no-underline">
          <LogoMark className="max-[419px]:hidden" />
          <span className="flex flex-col leading-none whitespace-nowrap">
            <span className="font-serif text-lg font-semibold tracking-[0.12em] text-ink">DENTAL PLAZA</span>
            <span className="mt-[5px] text-[10px] font-semibold tracking-[0.36em] text-muted">SARAJEVO</span>
          </span>
        </a>
        <nav className="nav-desk flex items-center gap-7" aria-label={t.mainNav}>
          {links.map(([href, label]) => (
            <a key={href} className="navlink" href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <BookButton className="btn btn-p btn-s hide-m">{t.book}</BookButton>
          <button
            type="button"
            className="iconbtn burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className="relative size-[22px]">
              <MenuIcon
                className={`absolute inset-0 transition-[opacity,transform] duration-300 ${menuOpen ? 'rotate-90 opacity-0' : 'opacity-100'}`}
              />
              <CloseIcon
                size={22}
                className={`absolute inset-0 transition-[opacity,transform] duration-300 ${menuOpen ? 'opacity-100' : '-rotate-90 opacity-0'}`}
              />
            </span>
          </button>
        </div>
      </div>
      {/* Mobile menu: drops down over the page (no layout shift) with a height + fade animation. */}
      <div
        className={`nav-mobile absolute inset-x-0 top-full transition-[grid-template-rows] duration-300 ease-out ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        inert={!menuOpen}
      >
        <nav
          id="mobile-nav"
          aria-label={t.mobileNav}
          className={`min-h-0 overflow-hidden bg-white shadow-[0_18px_30px_rgba(15,82,87,.10)] transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="wrap flex flex-col border-t border-ink/[0.06] pt-2 pb-4">
            {links.map(([href, label], i) => (
              <a
                key={href}
                className={`navlink !px-1 !py-3.5 !text-lg transition-[opacity,transform] duration-300 ease-out ${
                  menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${60 + i * 40}ms` : '0ms' }}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
