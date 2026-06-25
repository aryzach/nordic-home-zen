import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const transparent = !isScrolled && !isMobileMenuOpen;
  const lightOnHero = isHome && transparent;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname, location.hash]);

  const navLinkClass = cn(
    "text-[15px] font-semibold tracking-wide transition-colors duration-200",
    lightOnHero ? "text-white/90 hover:text-white" : "text-foreground/85 hover:text-foreground"
  );

  const navItems = [
    { label: "Specs", to: "/specs" },
    { label: "Installs", to: "/installs" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/95 backdrop-blur-sm border-b border-border"
        )}
      >
        <div className="container-x">
          <div className="flex items-center justify-between h-[78px] lg:h-24">
            {/* Wordmark */}
            <button
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={cn(
                "text-left font-bold uppercase tracking-tight text-[15px] md:text-[17px] leading-tight transition-colors duration-200",
                lightOnHero ? "text-white" : "text-foreground"
              )}
            >
              Anywhere Sauna
              <span className={cn("block text-[10px] font-medium tracking-[0.18em] mt-0.5", lightOnHero ? "text-white/60" : "text-muted-foreground")}>
                BY SF SAUNA
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-9">
              {navItems.map(item => (
                <button key={item.to} onClick={() => navigate(item.to)} className={navLinkClass}>{item.label}</button>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  lightOnHero ? "btn-outline" : "btn-dark-outline"
                )}
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "header" },
                    openBookingUrl
                  )
                }
              >
                Book Free Consultation
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                className="btn-primary"
                onClick={() =>
                  trackAndNavigate(
                    "buy_now_click",
                    { button_text: "Buy Now", location: "header" },
                    () => navigate("/specs")
                  )
                }
              >
                Buy Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("lg:hidden transition-colors duration-200", lightOnHero ? "text-white" : "text-foreground")}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay — rendered via portal so it isn't trapped in the header's stacking context */}
      {isMobileMenuOpen && typeof document !== "undefined" && createPortal(
        <div className="lg:hidden fixed inset-0 top-[78px] bg-background z-[100] overflow-y-auto">
          <nav className="container-x py-10 flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); navigate(item.to); }}
                className="text-left text-[24px] font-semibold text-foreground py-5 border-b border-border"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="btn-dark-outline mt-8 w-full inline-flex items-center justify-center gap-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackAndNavigate(
                  "consultation_booking_click",
                  { button_text: "Book Free Consultation", location: "header_mobile" },
                  openBookingUrl
                );
              }}
            >
              Book Free Consultation
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn-primary mt-3 w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackAndNavigate(
                  "buy_now_click",
                  { button_text: "Buy Now", location: "header_mobile" },
                  () => navigate("/specs")
                );
              }}
            >
              Buy Now
            </button>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
