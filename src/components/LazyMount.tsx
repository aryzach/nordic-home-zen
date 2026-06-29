import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** px before entering viewport to start mounting */
  rootMargin?: string;
  /** minHeight placeholder to avoid CLS while not yet mounted */
  minHeight?: number | string;
  fallback?: ReactNode;
}

/**
 * Mounts children only once the placeholder scrolls within rootMargin
 * of the viewport. Use for below-the-fold sections so their JS, images,
 * and effects do not block initial render on mobile.
 */
const LazyMount = ({
  children,
  rootMargin = "300px 0px",
  minHeight = 200,
  fallback = null,
}: LazyMountProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </div>
  );
};

export default LazyMount;
