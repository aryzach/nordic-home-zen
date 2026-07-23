import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  saunaOptions,
  categoryBlobs,
  blobColorMap,
  chartConfig,
  estimatedTotal,
  formatCostRange,
  type SaunaOption,
} from "@/data/saunaMarketMap";
import { cn } from "@/lib/utils";

// SVG viewbox: 0..100 in both axes (x = complexity, y = 100 - experience)
const VB = 100;

const toX = (complexity: number) => complexity;
const toY = (experience: number) => 100 - experience;

const SaunaMarketMap = () => {
  const [selectedId, setSelectedId] = useState<string>("anywhere-sauna");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => saunaOptions.find((o) => o.id === selectedId) ?? saunaOptions[0],
    [selectedId]
  );

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId("anywhere-sauna");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-foreground">{chartConfig.title}</h3>
        <p className="text-xs text-muted-foreground tracking-wide">{chartConfig.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start">
        {/* Chart */}
        <div className="relative">
          {/* Top label */}
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mb-2">
            {chartConfig.labels.top}
          </div>

          <div className="relative flex items-stretch">
            {/* Left label */}
            <div className="flex items-center justify-center pr-2">
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/70 whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {chartConfig.labels.left}
              </span>
            </div>

            {/* Chart area */}
            <div
              className="relative flex-1 rounded-lg"
              style={{ background: "hsl(31, 64%, 96%)" }}
            >
              <svg
                viewBox={`0 0 ${VB} ${VB}`}
                preserveAspectRatio="none"
                className="w-full aspect-square block"
                role="img"
                aria-label="Sauna comparison market map"
              >
                {/* Blobs */}
                <g>
                  {categoryBlobs.map((b) => (
                    <ellipse
                      key={b.id}
                      cx={b.centerX}
                      cy={100 - b.centerY}
                      rx={b.radiusX}
                      ry={b.radiusY}
                      transform={`rotate(${b.rotation} ${b.centerX} ${100 - b.centerY})`}
                      fill={blobColorMap[b.colorFamily]}
                      opacity={b.opacity}
                    />
                  ))}
                </g>

                {/* Axes */}
                <line x1={50} y1={0} x2={50} y2={100} stroke="hsl(0,0%,70%)" strokeWidth={0.2} />
                <line x1={0} y1={50} x2={100} y2={50} stroke="hsl(0,0%,70%)" strokeWidth={0.2} />

                {/* Category labels — main scanning layer */}
                <g aria-hidden="true">
                  {categoryBlobs.map((b) => (
                    <text
                      key={`cat-${b.id}`}
                      x={b.labelX}
                      y={100 - b.labelY}
                      fontSize={2}
                      fontWeight={400}
                      letterSpacing="0.22em"
                      textAnchor="middle"
                      fill="hsl(0,0%,42%)"
                      opacity={0.7}
                      style={{
                        paintOrder: "stroke",
                        stroke: "hsl(31, 64%, 96%)",
                        strokeWidth: 0.8,
                      }}
                    >
                      {b.displayLabel}
                    </text>
                  ))}
                </g>

                {/* Anywhere halo — soft translucent */}
                {saunaOptions
                  .filter((o) => o.featured)
                  .map((o) => (
                    <g key={`halo-${o.id}`}>
                      <circle
                        cx={toX(o.complexityScore)}
                        cy={toY(o.experienceScore)}
                        r={5}
                        fill="hsl(31, 64%, 55%)"
                        opacity={0.18}
                      />
                      <circle
                        cx={toX(o.complexityScore)}
                        cy={toY(o.experienceScore)}
                        r={3.2}
                        fill="none"
                        stroke="hsl(31, 64%, 45%)"
                        strokeWidth={0.35}
                        opacity={0.6}
                      />
                    </g>
                  ))}

                {/* Dots + labels */}
                {saunaOptions.map((o) => {
                  const cx = toX(o.complexityScore);
                  const cy = toY(o.experienceScore);
                  const isFeatured = !!o.featured;
                  const isSelected = selectedId === o.id;
                  const isHovered = hoveredId === o.id;
                  const isActive = isSelected || isHovered;
                  // Base radius: featured slightly larger; non-featured reduced ~23%
                  const baseR = isFeatured ? 2.0 : 1.2;
                  const r = baseR + (isActive ? 0.55 : 0);
                  // Suppress the "Traditional Prefab" broad-category label entirely
                  const suppressLabel = o.id === "premium-prefab-sauna";
                  // Show label if featured, selected, or currently hovered/focused
                  const showLabel =
                    !suppressLabel && (isFeatured || isSelected || isHovered);

                  // Pill dimensions estimate (fontSize 2.5, char ~1.35 wide)
                  const labelText = o.name;
                  const pillW = labelText.length * 1.35 + 2.4;
                  const pillH = 3.6;
                  const lx = cx + o.label.offsetX * 0.1;
                  const ly = cy + o.label.offsetY * 0.1;
                  const anchor = o.label.anchor;
                  const pillX =
                    anchor === "start"
                      ? lx - 1.2
                      : anchor === "end"
                      ? lx - pillW + 1.2
                      : lx - pillW / 2;
                  const pillY = ly - pillH + 0.9;

                  return (
                    <g
                      key={o.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${o.name} — open details`}
                      onClick={() => {
                        setSelectedId(o.id);
                        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(o.id);
                        }
                      }}
                      onMouseEnter={() => setHoveredId(o.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(o.id)}
                      onBlur={() => setHoveredId(null)}
                      style={{ cursor: "pointer", outline: "none" }}
                    >
                      {/* Larger invisible hit target for touch */}
                      <circle cx={cx} cy={cy} r={4} fill="transparent" />
                      {/* Selected outer ring */}
                      {isSelected && !isFeatured && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={r + 1.2}
                          fill="none"
                          stroke="hsl(0,0%,20%)"
                          strokeWidth={0.35}
                          opacity={0.55}
                        />
                      )}
                      {isSelected && isFeatured && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={r + 1.4}
                          fill="none"
                          stroke="hsl(31, 64%, 40%)"
                          strokeWidth={0.5}
                          opacity={0.9}
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill={isFeatured ? "hsl(31, 64%, 45%)" : "hsl(0, 0%, 30%)"}
                        opacity={isFeatured ? 1 : isActive ? 0.95 : 0.7}
                      />
                      {showLabel && (
                        <>
                          <rect
                            x={pillX}
                            y={pillY}
                            width={pillW}
                            height={pillH}
                            rx={0.8}
                            ry={0.8}
                            fill="hsl(31, 64%, 96%)"
                            opacity={0.95}
                          />
                          <text
                            x={lx}
                            y={ly}
                            fontSize={2.5}
                            fontWeight={isSelected || isFeatured ? 600 : 500}
                            textAnchor={anchor}
                            fill="hsl(0,0%,11%)"
                          >
                            {labelText}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right label */}
            <div className="flex items-center justify-center pl-2">
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/70 whitespace-nowrap"
                style={{ writingMode: "vertical-rl" }}
              >
                {chartConfig.labels.right}
              </span>
            </div>
          </div>

          {/* Bottom label */}
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mt-2">
            {chartConfig.labels.bottom}
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground mt-4 max-w-2xl">
            {chartConfig.disclaimer}
          </p>
        </div>

        {/* Details panel */}
        <div ref={detailsRef}>
          <DetailPanel option={selected} onClose={() => setSelectedId("anywhere-sauna")} />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between gap-4 py-1.5 border-b border-border/60 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground text-right">{value}</span>
  </div>
);

const DetailPanel = ({ option, onClose }: { option: SaunaOption; onClose: () => void }) => {
  const total = estimatedTotal(option);
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5",
        option.featured && "ring-1 ring-[hsl(31,64%,45%)]"
      )}
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {option.type}
          </div>
          <h4 className="text-foreground">{option.name}</h4>
        </div>
        {!option.featured && (
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{option.summary}</p>

      <div className="mb-4">
        <Row label="Product cost" value={formatCostRange(option.costs.product)} />
        <Row label="Shipping" value={formatCostRange(option.costs.shipping)} />
        <Row label="Installation" value={formatCostRange(option.costs.installation)} />
        <Row label="Electrical" value={formatCostRange(option.costs.electrical)} />
        <Row label="Site prep" value={formatCostRange(option.costs.sitePrep)} />
        <div className="flex justify-between gap-4 py-2 mt-1 text-sm font-semibold">
          <span className="text-foreground">Estimated total installed</span>
          <span className="text-foreground">{formatCostRange(total)}</span>
        </div>
      </div>

      <div className="mb-4">
        <Row label="Install time" value={option.installTime} />
        <Row label="Electrical" value={option.electricalRequirement} />
        <Row
          label="Max typical temp"
          value={option.maxTypicalTempF ? `${option.maxTypicalTempF}°F` : "—"}
        />
        <Row label="Water on stones" value={option.waterOnStones} />
        <Row label="Placement" value={option.placement} />
        <Row label="Footprint" value={option.footprint} />
        <Row label="Moveability" value={option.moveability} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Pros</div>
          <ul className="text-sm text-foreground space-y-1">
            {option.pros.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">Cons</div>
          <ul className="text-sm text-foreground space-y-1">
            {option.cons.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
      </div>

      {option.examples.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
            Representative
          </div>
          <ul className="text-sm space-y-1">
            {option.examples.map((ex) => (
              <li key={ex.brand + (ex.model ?? "")}>
                <a
                  href={ex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground underline underline-offset-2 hover:opacity-80"
                >
                  {ex.brand}
                  {ex.model ? ` — ${ex.model}` : ""}
                  <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {option.cta && (
        <div className="flex flex-col gap-2 pt-2">
          {option.cta.primary && (
            <Link to={option.cta.primary.href} className="btn-primary text-center">
              {option.cta.primary.label}
            </Link>
          )}
          {option.cta.secondary && (
            <Link to={option.cta.secondary.href} className="btn-dark-outline text-center">
              {option.cta.secondary.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SaunaMarketMap;
