import { useEffect, useRef } from "react";

const CalInlineEmbed = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "30min", {origin:"https://app.cal.com"});

Cal.config = Cal.config || {};

Cal.config.forwardQueryParams = true;

Cal.ns["30min"]("inline", {
    elementOrSelector:"#my-cal-inline-30min",
    config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
    calLink: "zach-pretzell/30min",
});

Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[700px] my-8 overflow-hidden">
      <div id="my-cal-inline-30min" style={{ width: "100%", height: "100%", overflow: "scroll" }} />
    </div>
  );
};

export default CalInlineEmbed;
