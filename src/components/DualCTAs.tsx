import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";

const DualCTAs = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <div className="flex flex-col items-center gap-3 max-w-md mx-auto w-full">
          <Button
            shape="pill"
            className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
            onClick={() =>
              trackAndNavigate(
                "buy_now_click",
                { button_text: "Buy now for $8,485", location: "dual_ctas" },
                () => navigate("/deposit")
              )
            }
          >
            Buy now for $8,485
            <ArrowRight className="ml-1" size={20} />
          </Button>
          <div className="text-muted-foreground text-xs font-sans">or</div>
          <div className="flex flex-col items-center w-full">
            <Button
              asChild
              shape="pill"
              className="bg-transparent border-[3px] border-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
            >
              <Link to="/electrical-compatibility-quiz">
                Take the Electrical Compatibility Quiz
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DualCTAs;
