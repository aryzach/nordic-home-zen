import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackAndNavigate } from "@/lib/analytics";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const transparent = isHome && !isScrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = cn(
    "text-[13px] font-medium tracking-wide transition-colors duration-200",
    transparent ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground"
  );

  return (
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
              transparent ? "text-white" : "text-foreground"
            )}
          >
            The Anywhere Sauna
            <span className={cn("block text-[10px] font-medium tracking-[0.18em] mt-0.5", transparent ? "text-white/60" : "text-muted-foreground")}>
              BY SF SAUNA
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-9">
            <Link to="/history" className={navLinkClass}>History</Link>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate("/#about-the-sauna"); }} className={navLinkClass}>
              Specs
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate("/#faq"); }} className={navLinkClass}>
              FAQ
            </button>
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className={transparent ? "btn-outline" : "btn-dark-outline"}
              onClick={() =>
                trackAndNavigate(
                  "consultation_booking_click",
                  { button_text: "Book Electrical Compatibility Consultation", location: "header" },
                  () => navigate("/sauna-electrical-fit-consultation")
                )
              }
            >
              Consultation
            </button>
            <button
              className="btn-primary"
              onClick={() =>
                trackAndNavigate(
                  "buy_now_click",
                  { button_text: "Buy Now", location: "header" },
                  () => navigate("/buy-your-anywhere-sauna")
                )
              }
            >
              Buy Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("lg:hidden transition-colors duration-200", transparent ? "text-white" : "text-foreground")}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[78px] bg-background z-40 overflow-y-auto">
          <nav className="container-x py-10 flex flex-col">
            <Link
              to="/history"
              className="text-[24px] font-semibold text-foreground py-5 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              History
            </Link>
            <button
              className="text-left text-[24px] font-semibold text-foreground py-5 border-b border-border"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackAndNavigate(
                  "consultation_booking_click",
                  { button_text: "Electrical Compatibility Consultation", location: "header_mobile" },
                  () => navigate("/sauna-electrical-fit-consultation")
                );
              }}
            >
              Electrical Compatibility Consultation
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate("/#about-the-sauna"); }}
              className="text-left text-[24px] font-semibold text-foreground py-5 border-b border-border"
            >
              Specs
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate("/#faq"); }}
              className="text-left text-[24px] font-semibold text-foreground py-5 border-b border-border"
            >
              FAQ
            </button>
            <button
              className="btn-primary mt-8 w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackAndNavigate(
                  "buy_now_click",
                  { button_text: "Buy Now", location: "header_mobile" },
                  () => navigate("/buy-your-anywhere-sauna")
                );
              }}
            >
              Buy Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
