import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackAndNavigate } from "@/lib/analytics";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Only use transparent-over-hero treatment on the homepage
  const isHome = location.pathname === "/";
  const transparent = isHome && !isScrolled && !isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-[hsl(var(--color-bg))]/95 backdrop-blur-sm border-b border-border"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={cn(
              "text-left font-heading text-xl md:text-2xl font-semibold transition-colors leading-tight",
              transparent ? "text-white hover:text-accent" : "text-[hsl(var(--color-heading))] hover:text-accent"
            )}
          >
            <div>The Anywhere Sauna</div>
            <div className={cn("text-xs font-normal font-sans", transparent ? "text-white/60" : "text-[hsl(var(--color-text))]")}>
              by SF Sauna
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 font-sans">
            {[
              { to: "/history", label: "History" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "transition-colors",
                  transparent ? "text-white/80 hover:text-white" : "text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-heading))]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate("/#about-the-sauna"); }}
              className={cn(
                "transition-colors",
                transparent ? "text-white/80 hover:text-white" : "text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-heading))]"
              )}
            >
              Specs
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate("/#faq"); }}
              className={cn(
                "transition-colors",
                transparent ? "text-white/80 hover:text-white" : "text-[hsl(var(--color-text))] hover:text-[hsl(var(--color-heading))]"
              )}
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button shape="pill" className={cn(
              "font-sans font-medium bg-transparent border-[3px]",
              transparent ? "border-white text-white" : "border-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]"
            )}
              onClick={() =>
                trackAndNavigate(
                  "consultation_booking_click",
                  { button_text: "Book Electrical Compatibility Consultation", location: "header" },
                  () => navigate("/sauna-electrical-fit-consultation")
                )
              }
            >
              Book Electrical Compatibility Consultation
            </Button>
            <Button shape="pill" className="font-sans font-medium bg-accent text-white"
              onClick={() =>
                trackAndNavigate(
                  "buy_now_click",
                  { button_text: "Buy Now", location: "header" },
                  () => navigate("/buy-your-anywhere-sauna")
                )
              }
            >
              Buy Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("md:hidden", transparent ? "text-white" : "text-[hsl(var(--color-heading))]")}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border font-sans">
            <div className="flex flex-col gap-4">
              <Link to="/history" className="text-left text-foreground/70 hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                History
              </Link>
              <button
                type="button"
                className="text-left text-foreground/70 hover:text-foreground transition-colors"
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
              <button onClick={() => { setIsMobileMenuOpen(false); navigate("/#about-the-sauna"); }} className="text-left text-foreground/70 hover:text-foreground transition-colors">
                Specs
              </button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate("/#faq"); }} className="text-left text-foreground/70 hover:text-foreground transition-colors">
                FAQ
              </button>
              <Button shape="pill" className="w-full font-sans font-medium bg-accent text-white"
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
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
