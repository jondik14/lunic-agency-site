import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import Button from './Button';
import FooterTextEffect from './FooterTextEffect';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light');
  const [isLogoAreaDark, setIsLogoAreaDark] = useState(false);
  const location = useLocation();
  const largeTextRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const updateHeaderTheme = React.useCallback(() => {
    const bandY = 70; // vertical center of header band (for nav styling)
    const logoBandY = 20; // top of header where logo sits — only switch to white when this is fully in a dark section
    const sections = document.querySelectorAll<HTMLElement>('[data-theme]');

    let themeFound = false;
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      if (r.top <= bandY && r.bottom >= bandY) {
        setHeaderTheme(el.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
        themeFound = true;
        break;
      }
    }
    if (!themeFound) setHeaderTheme('light');

    // Logo: only switch to white when the area behind the logo (top of header) is fully in a dark section
    let logoDark = false;
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      if (r.top <= logoBandY && r.bottom >= logoBandY) {
        logoDark = el.getAttribute('data-theme') === 'dark';
        break;
      }
    }
    setIsLogoAreaDark(logoDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      updateHeaderTheme();
    };
    updateHeaderTheme(); // run on mount in case page loads scrolled
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateHeaderTheme);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderTheme);
    };
  }, [updateHeaderTheme]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (largeTextRef.current) {
      const rect = largeTextRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // When header has a light background (scrolled or mobile menu), use Blue logo.
  // White logo only when header is transparent AND the area behind the logo is fully in a dark section (not during the light→dark transition).
  const headerHasLightBg = isScrolled || isMobileMenuOpen;
  const logoSrc = (!headerHasLightBg && isLogoAreaDark)
    ? '/Assets/white-logotype.svg'
    : '/Assets/blue-logotype.svg';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element && location.pathname === '/') {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const isOnDark = headerTheme === 'dark' && !isScrolled;
  const isOnScroll = isScrolled || isMobileMenuOpen;

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header Styles */}
      <style>{`
        .header:has(.on-dark):not(.on-scroll) .btn {
          background-color: #fff;
          color: var(--color--content--perssian-blue, #4599fe);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .header::before, .header::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgb(0 0 0 / 35%), rgb(0 0 0 / 0%));
          opacity: 0;
          transition: opacity 0.65s cubic-bezier(0.785, 0.135, 0.15, 0.86);
          pointer-events: none;
        }
        .header::before {
          filter: blur(1.4rem);
          z-index: -1;
        }
        .header::after {
          filter: blur(0px);
          z-index: -2;
        }
        .header.on-scroll::before {
          opacity: 0.8;
        }
        .header.on-scroll::after {
          opacity: 1;
        }
        .header.on-light .header-btn-light,
        .header.on-dark .header-btn-dark {
          opacity: 1;
        }
        .header.on-light .header-btn-dark,
        .header.on-dark .header-btn-light {
          opacity: 0;
        }
        .header.on-scroll .header-btn-dark {
          opacity: 1 !important;
        }
        .header.on-scroll .header-btn-light {
          opacity: 0 !important;
        }
        .header-ham.active .header-ham-inner {
          transform: rotate(135deg);
          transition-delay: 0.2s;
        }
        .header-ham.active .header-ham-line:first-child {
          transform: rotate(90deg) translate(50%);
          opacity: 1;
        }
        .header-ham.active .header-ham-line:nth-child(2) {
          transform: translateY(calc(100% + 0.2rem));
          transition-delay: 0.1s;
        }
        .header-ham.active .header-ham-line:last-child {
          transform: translateX(-100%);
          opacity: 0;
        }
        @media only screen and (max-width: 991px) {
          .header.on-light .header-ham {
            border-color: rgba(0, 51, 87, 0.3);
          }
          .header-btn .btn-bg {
            background-color: transparent;
          }
          .header-btn .btn-inner {
            padding-block: 1.95rem;
            color: #fff;
          }
          .header.on-open-nav .header-menu,
          .header.on-open-nav .header-menu-list,
          .header.on-open-nav .header-btn {
            opacity: 1;
            transform: translate(0, 0);
            pointer-events: auto;
          }
          .header.on-open-nav .header-menu-link {
            pointer-events: auto;
          }
          .header.on-open-nav {
            color: var(--color--content--white, #fff) !important;
          }
          .header.on-open-nav .header-ham {
            border-color: rgba(255, 255, 255, 0.3) !important;
          }
        }
        @media only screen and (max-width: 991px) {
          .header.on-scroll .header-ham {
            border-color: var(--color--content--white, #fff);
          }
        }
        @media only screen and (max-width: 767px) {
          .header-btn .btn-inner {
            padding-block: 1.2rem 1.1rem;
          }
        }
        .text-flip {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.2em;
        }
        .text-flip-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }
        .text-flip-txt {
          display: block;
          white-space: nowrap;
          line-height: 1.2em;
        }
        .header-menu-link:hover .text-flip-inner {
          transform: translateY(-50%);
        }
      `}</style>

      {/* Header: logo left (12-col grid desktop, 4-col mobile), nav, CTA */}
      <header 
        className={`header fixed w-full z-50 transition-all duration-300 ${
          isOnScroll ? 'on-scroll bg-white/40 backdrop-blur-md' : 'bg-transparent'
        } ${isOnDark ? 'on-dark' : 'on-light'} ${isMobileMenuOpen ? 'on-open-nav' : ''}`}
        style={{ 
          paddingTop: isOnScroll ? 'clamp(0.75rem, 2vw, 1rem)' : 'clamp(1rem, 2.5vw, 1.25rem)', 
          paddingBottom: isOnScroll ? 'clamp(0.75rem, 2vw, 1rem)' : 'clamp(1rem, 2.5vw, 1.25rem)',
          position: 'relative'
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: 12‑column grid — logo col 1–2, nav 3–8, CTA 9–12 */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-4 lg:gap-6 md:items-center">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link to="/" className="block w-fit">
                  <img 
                    src={logoSrc} 
                    alt="LUNIC Studio" 
                    className="h-12 lg:h-14 w-auto transition-opacity duration-200"
                    decoding="async"
                  />
                </Link>
              </motion.div>
            </div>
            <nav className="header-menu md:col-span-6 flex items-center gap-1" role="navigation" aria-label="Main navigation">
              <div className="header-menu-list flex items-center gap-1">
                {NAV_LINKS.filter((l) => !l.isPrimary).map((link) => (
                  <div key={link.href} className="header-menu-item">
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`header-menu-link group relative py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 min-h-[44px] flex items-center justify-center ${
                        isOnDark && !isOnScroll
                          ? 'text-white/90 hover:text-white'
                          : 'text-studio-muted hover:text-studio-ink'
                      }`}
                    >
                      <div className="text-flip">
                        <div className="text-flip-inner">
                          <div className="text-flip-txt">{link.label}</div>
                          <div className="text-flip-txt">{link.label}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
            <div className="md:col-span-4 flex justify-end">
              {NAV_LINKS.filter((l) => l.isPrimary).map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link to={link.href} className="header-btn relative inline-block">
                    {/* Dark button (for light backgrounds) */}
                    <div className={`header-btn-dark absolute inset-0 transition-opacity duration-300 ${isOnDark && !isOnScroll ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                      <div className="btn relative bg-white text-studio-accent border border-white/10 rounded-xl px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:bg-white/90 overflow-hidden">
                        <div className="btn-inner relative z-10">{link.label}</div>
                        <div className="btn-bg absolute inset-0 rounded-xl bg-studio-accent opacity-0 transition-opacity duration-200 group-hover:opacity-10"></div>
                      </div>
                    </div>
                    {/* Light button (for dark backgrounds) */}
                    <div className={`header-btn-light relative transition-opacity duration-300 ${isOnDark && !isOnScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="btn relative bg-studio-accent text-white border border-studio-accent/20 rounded-xl px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:bg-studio-accent/90 overflow-hidden">
                        <div className="btn-inner relative z-10">{link.label}</div>
                        <div className="btn-bg absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-10"></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: 4‑column grid — logo cols 1–2, menu cols 3–4 */}
          <div className="grid grid-cols-4 gap-4 items-center md:hidden">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="col-span-2 w-fit z-50 relative"
            >
              <Link to="/" className="block">
                <img 
                  src={logoSrc} 
                  alt="LUNIC Studio" 
                  className="h-12 w-auto max-w-full transition-opacity duration-200"
                  decoding="async"
                />
              </Link>
            </motion.div>
            <div className="col-span-2 flex justify-end">
              <button 
                className={`header-ham z-50 p-2 transition-colors border border-transparent rounded-lg ${isMobileMenuOpen ? 'active text-studio-ink' : isOnDark && !isOnScroll ? 'text-white border-white/30' : 'text-studio-ink border-studio-ink/30'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="header-ham-inner w-6 h-5 relative flex flex-col justify-between transition-transform duration-300">
                  <span className="header-ham-line w-full h-0.5 bg-current transition-all duration-300" />
                  <span className="header-ham-line w-full h-0.5 bg-current transition-all duration-300" />
                  <span className="header-ham-line w-full h-0.5 bg-current transition-all duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 px-4 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <nav className="header-menu flex flex-col items-center space-y-8">
            <div className="header-menu-list flex flex-col items-center space-y-8">
              {NAV_LINKS.filter((l) => !l.isPrimary).map((link) => (
                <div key={link.href} className="header-menu-item">
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="header-menu-link text-2xl md:text-3xl font-sans font-medium transition-colors hover:text-studio-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-4 rounded-lg px-4 py-2 text-studio-ink"
                  >
                    <div className="text-flip">
                      <div className="text-flip-inner">
                        <div className="text-flip-txt">{link.label}</div>
                        <div className="text-flip-txt">{link.label}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </nav>
          {NAV_LINKS.filter((l) => l.isPrimary).map((link) => (
            <Link 
              key={link.href} 
              to={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setIsMobileMenuOpen(false);
              }}
              className="header-btn mt-4"
            >
              <div className="btn bg-studio-accent text-white rounded-xl px-8 py-4 text-base font-bold tracking-wider uppercase">
                <div className="btn-inner">{link.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-studio-ink pt-16 md:pt-20 pb-0 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Meta - Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} Lunic Studio</p>
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy" 
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <div className="flex items-center gap-3">
                <a 
                  href={SOCIAL_LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn" 
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram" 
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large "LUNIC Studio" hexa — sits at bottom of page; hidden on mobile */}
        <div className="hidden md:block">
          <FooterTextEffect />
        </div>
      </footer>
    </div>
  );
};

export default Layout;