import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Instagram, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/booking";

const Footer = () => {
  const location = useLocation();

  const handlePoliciesClick = (e: React.MouseEvent) => {
    if (location.pathname === "/policies") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const colHeader = "text-[12px] uppercase tracking-[0.2em] text-white/40 mb-5 font-medium";
  const linkClass = "text-[14px] text-white/70 hover:text-white transition-colors duration-200";

  return (
    <footer id="contact" style={{ backgroundColor: "#111111", color: "#E7E3DC" }} className="pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-[17px] font-bold uppercase tracking-tight text-white mb-2">
              The Anywhere Sauna
            </h3>
            <p className="text-[12px] tracking-[0.18em] uppercase text-white/40 mb-6">By SF Sauna</p>
            <p className="text-[14px] text-white/60 leading-relaxed mb-6 max-w-xs">
              The world's only plug-in sauna.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/getanywheresauna/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/15 hover:bg-white/10 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white/80" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className={colHeader}>Company</h4>
            <ul className="space-y-3">
              <li><Link to="/history" className={linkClass}>History</Link></li>
              <li><Link to="/sauna-planning-consultation" className={linkClass}>Planning Consultation</Link></li>
              <li><Link to="/7-questions-before-buying-a-home-sauna" className={linkClass}>7 Questions Before Buying</Link></li>
              <li><Link to="/policies" onClick={handlePoliciesClick} className={linkClass}>Privacy Policy</Link></li>
            </ul>

          </div>

          {/* Product */}
          <div>
            <h4 className={colHeader}>Product</h4>
            <ul className="space-y-3">
              <li><Link to="/specs" className={linkClass}>Buy Now</Link></li>
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("consultation_booking_click", {
                      button_text: "Free Consultation",
                      location: "footer",
                    })
                  }
                  className={`${linkClass} inline-flex items-center gap-1.5`}
                >
                  Free Consultation
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li><Link to="/electrical-compatibility-quiz" className={linkClass}>Compatibility Quiz</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={colHeader}>Contact</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+14154890261" className={`${linkClass} flex items-center gap-2`} itemProp="telephone">
                  <Phone size={13} /> (415) 489-0261
                </a>
              </li>
              <li
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className="text-[14px] text-white/70 flex items-start gap-2"
              >
                <MapPin size={13} className="mt-1 flex-shrink-0" />
                <span>
                  <span itemProp="addressLocality">San Francisco</span>, <span itemProp="addressRegion">CA</span>
                </span>
              </li>
              <li>
                <a href="mailto:info@sf-sauna.com" className={`${linkClass} flex items-center gap-2`} itemProp="email">
                  <Mail size={13} /> info@sf-sauna.com
                </a>
              </li>
            </ul>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => {
                trackEvent("newsletter_signup", { location: "footer" });
                try { (window as any).fbq?.('track', 'Lead', { content_name: 'Footer Email Capture' }); } catch {}
              }}
              className="flex flex-col gap-2"
            >
              <input type="hidden" name="access_key" value="dbdd31bb-6234-4a4f-93cd-679cefbf3f78" />
              <input type="hidden" name="redirect" value={`${window.location.origin}/contact`} />
              <Input
                type="email"
                name="email"
                required
                placeholder="Email for updates"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40 text-[14px] rounded-none"
              />
              <button type="submit" className="btn-outline w-full" style={{ padding: "0.85rem 1.2rem" }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/40">© 2024 SF Sauna. All rights reserved.</p>
          <p className="text-[12px] text-white/40 uppercase tracking-[0.18em]">The world's only plug-in sauna</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
