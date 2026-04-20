import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Video, Home } from "lucide-react";

const ElectricChecklist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-6 text-heading">
              Electrical Fit Consultation
            </h1>
            
            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <p className="text-2xl font-heading font-semibold text-heading mb-2">
                98% of US homes and apartments already have what's needed.
              </p>
              <p className="text-muted-foreground">
                Book a quick 15-minute electrical consult to make sure you're good to go.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h2 className="text-2xl font-heading font-semibold text-heading mb-6">
                About the Call
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Home className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-foreground">Be at home</p>
                    <p className="text-muted-foreground">We need to see your space and outlet setup.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-foreground">FaceTime / video call preferred</p>
                    <p className="text-muted-foreground">So we can see around your home and confirm everything looks good.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-foreground">15 minutes, free</p>
                    <p className="text-muted-foreground">Quick and painless — we'll let you know if you're ready to go.</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              asChild 
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-white"
            >
              <a 
                href="https://calendar.app.google/tn9D96XCvg1sYfZGA" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2" size={18} />
                Book Free Electrical Consult
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
