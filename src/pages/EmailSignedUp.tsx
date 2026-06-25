import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail } from "lucide-react";

const EmailSignedUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form Section */}
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4 text-heading">
                  You Signed Up!
                </h1>
                <p className="text-lg text-text mb-8">
                  Thanks for subscribing — you'll hear from us soon. If you'd like us to reach out directly, please fill out this form with a question.
                </p>

                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={() => { try { (window as any).fbq?.('track', 'Lead', { content_name: 'Email Signed Up Page' }); } catch {} }}
                  className="space-y-6"
                >
                  <input type="hidden" name="access_key" value="91e8aa2d-8afa-4f9b-bab7-bfaca33818bd" />
                  <input type="hidden" name="redirect" value={`${window.location.origin}/contact-thanks`} />

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input type="tel" id="phone" name="phone" placeholder="(555) 555-5555" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Question</Label>
                    <Textarea id="message" name="message" placeholder="What would you like to know?" rows={5} />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* NAP Section */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-6 text-heading">
                  Get in Touch
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-heading">Phone</p>
                      <a href="tel:+14154890261" className="text-text hover:text-accent transition-colors">
                        (415) 489-0261
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-heading">Email</p>
                      <a href="mailto:info@sf-sauna.com" className="text-text hover:text-accent transition-colors">
                        info@sf-sauna.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmailSignedUp;
