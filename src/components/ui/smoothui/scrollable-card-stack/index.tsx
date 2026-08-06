"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_TIMEOUT_OFFSET = 100;
const MIN_SCROLL_INTERVAL = 300;
const SCROLL_THRESHOLD = 20;
const TOUCH_SCROLL_THRESHOLD = 100;
const SCALE_FACTOR = 0.08;
const MIN_SCALE = 0.08;
const MAX_SCALE = 2;
const HOVER_SCALE_MULTIPLIER = 1.02;
const CARD_PADDING = 100;

/** Adapted from the smoothui demo shape, which was avatar + image + handle.
 *  The stack's value is its scroll/drag/spring behaviour, not its card body —
 *  so the body is now caller-supplied and the component is agnostic about what
 *  is inside it. `label` is what the live region announces. */
interface CardItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
}

const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  cardHeight = 384,
  perspective = 1000,
  transitionDuration = 180,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Calculate the total number of items
  const totalItems = items.length;
  const maxIndex = totalItems - 1;

  // Constants for visual effects - matching reference code exactly
  const FRAME_OFFSET = -30;
  const FRAMES_VISIBLE_LENGTH = 3;
  const SNAP_DISTANCE = 50;

  // Clamp function from reference code - memoized to prevent recreation
  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number =>
      Math.min(Math.max(val, min), max),
    []
  );

  // Controlled scroll function to move exactly one card
  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < MIN_SCROLL_INTERVAL) {
        return;
      }

      const newIndex = clamp(currentIndex + direction, [0, maxIndex]);

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);

        setTimeout(() => {
          setIsScrolling(false);
        }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, transitionDuration, clamp]
  );

  // Handle scroll events with improved responsiveness
  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) {
        return;
      }

      if (Math.abs(deltaY) < SCROLL_THRESHOLD) {
        return;
      }

      const scrollDirection = deltaY > 0 ? 1 : -1;
      scrollToCard(scrollDirection);
    },
    [isDragging, isScrolling, scrollToCard]
  );

  // Handle wheel events
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    },
    [handleScroll]
  );

  // Handle keyboard navigation - improved with reference code logic
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          scrollToCard(-1);
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          scrollToCard(1);
          break;
        }
        case "Home": {
          e.preventDefault();
          if (currentIndex !== 0) {
            setIsScrolling(true);
            setCurrentIndex(0);
            scrollY.set(0);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (currentIndex !== maxIndex) {
            setIsScrolling(true);
            setCurrentIndex(maxIndex);
            scrollY.set(maxIndex * SNAP_DISTANCE);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        default: {
          // No action for other keys
          break;
        }
      }
    },
    [
      currentIndex,
      maxIndex,
      scrollY,
      isScrolling,
      scrollToCard,
      transitionDuration,
    ]
  );

  // Handle touch events for mobile
  const touchStartY = useRef(0);
  const touchStartIndex = useRef(0);
  const touchStartTime = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartIndex.current = currentIndex;
      touchStartTime.current = Date.now();
      touchMoved.current = false;
      setIsDragging(true);
    },
    [currentIndex]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) {
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (Math.abs(deltaY) > TOUCH_SCROLL_THRESHOLD && !touchMoved.current) {
        const scrollDirection = deltaY > 0 ? 1 : -1;
        scrollToCard(scrollDirection);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Snap to current index when not dragging
  useEffect(() => {
    if (!isDragging) {
      scrollY.set(currentIndex * SNAP_DISTANCE);
    }
  }, [currentIndex, isDragging, scrollY]);

  // Calculate transform for each card based on the reference code
  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;

      // Apply blur effect for cards behind the current one - matching reference exactly
      const isBehindCurrent = currentIndex > index;
      const blur = !shouldReduceMotion && isBehindCurrent ? 2 : 0;

      // Opacity based on distance - improved logic from reference
      const opacity = currentIndex > index ? 0 : 1;

      // Scale with improved calculation inspired by reference - using clamp function
      const scale = shouldReduceMotion
        ? 1
        : clamp(1 - offsetIndex * SCALE_FACTOR, [MIN_SCALE, MAX_SCALE]);

      // Vertical offset with improved calculation - matching reference exactly
      const y = shouldReduceMotion
        ? 0
        : clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

      // Z-index for proper layering - matching reference pattern
      const zIndex = items.length - index;

      return {
        blur,
        opacity,
        scale,
        y,
        zIndex,
      };
    },
    [currentIndex, items.length, clamp, shouldReduceMotion]
  );

  return (
    /* `aria-live="polite" aria-atomic="true"` was on this section as shipped,
       and this section contains all four cards. Every drag, scroll and dot
       press therefore re-announced the entire stack — measured at 1,299
       characters — over the top of whatever the reader was doing. The
       dedicated sr-only region further down already announces the one thing
       that changed, in 85 characters, which is the correct behaviour. Removed
       rather than narrowed: two live regions describing the same state is a
       double announcement even when both are small. */
    <section
      aria-label="Scrollable card stack"
      aria-roledescription="carousel"
      className={cn("relative mx-auto h-fit w-fit min-w-[300px]", className)}
    >
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Interactive scrollable widget requires event handlers */}
      <div
        aria-label="Scrollable card container"
        className="h-full w-full"
        onKeyDown={handleKeyDown}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="application"
        style={{
          minHeight: `${cardHeight + CARD_PADDING}px`, // Add some padding for the card stack effect
          perspective: `${perspective}px`,
          perspectiveOrigin: "center 60%",
          touchAction: "none",
        }}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Required for keyboard navigation
        tabIndex={0}
      >
        {items.map((item, i) => {
          const transform = getCardTransform(i);
          const isActive = i === currentIndex;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { x: "-50%" }
                  : {
                      scale: transform.scale,
                      x: "-50%",
                      y: `calc(-50% + ${transform.y}px)`,
                    }
              }
              aria-hidden={!isActive}
              className="absolute top-1/2 left-1/2 w-max max-w-[100vw] overflow-hidden rounded-2xl"
              data-active={isActive}
              initial={false}
              key={`scrollable-card-${item.id}`}
              onBlur={() => setHoveredIndex(null)}
              onFocus={() => isActive && setHoveredIndex(i)}
              onMouseEnter={() => isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                // Dynamic border width based on scale - from reference code
                borderWidth: `${2 / transform.scale}px`,
                filter: `blur(${transform.blur}px)`,
                height: `${cardHeight}px`,
                opacity: transform.opacity,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: "center center",
                transitionDuration: shouldReduceMotion ? "0ms" : "200ms",
                transitionProperty: shouldReduceMotion
                  ? "none"
                  : "opacity, filter",
                transitionTimingFunction:
                  "cubic-bezier(0.645, 0.045, 0.355, 1)",
                willChange: shouldReduceMotion
                  ? undefined
                  : "opacity, filter, transform",
                zIndex: transform.zIndex,
              }}
              tabIndex={isActive ? 0 : -1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      damping: 20,
                      duration: 0.25,
                      mass: 0.5,
                      stiffness: 250,
                      type: "spring" as const,
                    }
              }
              whileHover={
                shouldReduceMotion || !isActive
                  ? {}
                  : {
                      scale: transform.scale * HOVER_SCALE_MULTIPLIER,
                      transition: {
                        damping: 20,
                        duration: 0.25,
                        mass: 0.5,
                        stiffness: 250,
                        type: "spring" as const,
                      },
                    }
              }
            >
              {/* Card body. Caller-supplied — see CardItem. */}
              <div
                className={cn(
                  'flex w-full flex-col overflow-hidden rounded-2xl transition-shadow duration-200',
                  isHovered && 'shadow-xl'
                )}
                style={{
                  background: 'var(--color-paper)',
                  border: '1px solid var(--color-hairline)',
                  boxShadow: isActive ? 'var(--shadow-3)' : 'var(--shadow-1)',
                  height: `${cardHeight}px`,
                }}
              >
                {/* Scroll indicator */}
                {isScrolling && isActive ? (
                  <div
                    className="-top-1 -translate-x-1/2 absolute left-1/2 h-1 w-8 rounded-full opacity-75"
                    style={{ background: 'var(--page-accent)' }}
                  />
                ) : null}

                {item.content}
              </div>
            </motion.div>
          );
        })}

        {/* Navigation indicators */}
        <div
          aria-label="Card navigation"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2"
          role="tablist"
        >
          {Array.from({ length: items.length }, (_, i) => (
            <motion.button
              aria-label={`Go to ${items[i]?.label ?? `card ${i + 1}`}`}
              aria-selected={i === currentIndex}
              className={cn(
                "h-2 w-2 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                i === currentIndex ? "scale-125" : ""
              )}
              style={{
                background:
                  i === currentIndex ? "var(--page-accent)" : "var(--color-control)",
                opacity: i === currentIndex ? 1 : 0.4,
              }}
              key={`scrollable-indicator-${items[i]?.id || i}`}
              onClick={() => {
                if (i !== currentIndex && !isScrolling) {
                  setIsScrolling(true);
                  setCurrentIndex(i);
                  scrollY.set(i * SNAP_DISTANCE);
                  setTimeout(() => {
                    setIsScrolling(false);
                  }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
                }
              }}
              role="tab"
              transition={{
                damping: 20,
                mass: 0.5,
                stiffness: 250,
                type: "spring" as const,
              }}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Instructions for screen readers */}
        <div aria-live="polite" className="sr-only">
          {`${items[currentIndex]?.label ?? ""} — card ${currentIndex + 1} of ${items.length}. Use arrow keys to move one card at a time, or the dots below.`}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCardStack;
