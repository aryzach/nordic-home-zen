import { useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="w-full pt-2 pb-0">
      <div className="container mx-auto px-4">
        <div>
          <div className="elfsight-app-8e4c426b-67fd-4565-8145-975c8d5acc74" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
