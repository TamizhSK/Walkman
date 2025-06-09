"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface PointerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  hideOnTouch?: boolean;
}

/**
 * Ultra-fast custom pointer component with minimal overhead.
 * Optimized for maximum speed and responsiveness.
 *
 * @component
 * @param {PointerProps} props - The component props
 */
export function Pointer({
  className,
  style,
  children,
  springConfig = { stiffness: 800, damping: 25, mass: 0.05 },
  hideOnTouch = true,
  ...props
}: PointerProps): React.ReactElement {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Ultra-fast springs with minimal mass
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  // Detect touch device (memoized)
  useEffect(() => {
    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouchSupported);
  }, []);

  // Ultra-optimized mouse position update with throttling
  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    const now = performance.now();
    
    // Throttle updates to ~120fps for optimal performance
    if (now - lastUpdateTime.current < 8.33) {
      return;
    }
    
    lastUpdateTime.current = now;
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      x.set(clientX);
      y.set(clientY);
    });
  }, [x, y]);

  useEffect(() => {
    // Early return for touch devices
    if (hideOnTouch && isTouchDevice) {
      return;
    }

    if (typeof window === "undefined" || !containerRef.current) {
      return;
    }

    const parentElement = containerRef.current.parentElement;
    if (!parentElement) return;

    // Set cursor to none for custom pointer
    parentElement.style.cursor = "none";

    // Optimized event handlers with minimal operations
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseEnter = () => setIsActive(true);
    
    const handleMouseLeave = () => {
      setIsActive(false);
      setIsPressed(false);
      setIsDragging(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      setIsDragging(false);
    };

    const handleDragStart = (e: DragEvent) => {
      setIsDragging(true);
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleDrag = (e: DragEvent) => {
      // Only update if coordinates are valid
      if (e.clientX !== 0 || e.clientY !== 0) {
        updateMousePosition(e.clientX, e.clientY);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setIsPressed(false);
    };

    // Touch events for hybrid devices (minimal overhead)
    const handleTouchStart = (e: TouchEvent) => {
      if (!hideOnTouch && e.touches[0]) {
        const touch = e.touches[0];
        setIsPressed(true);
        setIsActive(true);
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!hideOnTouch && e.touches[0]) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      if (!hideOnTouch) {
        setIsPressed(false);
        setIsActive(false);
      }
    };

    // Add event listeners with passive flag for better performance
    const eventOptions = { passive: true };
    
    parentElement.addEventListener("mousemove", handleMouseMove, eventOptions);
    parentElement.addEventListener("mouseenter", handleMouseEnter);
    parentElement.addEventListener("mouseleave", handleMouseLeave);
    parentElement.addEventListener("mousedown", handleMouseDown);
    parentElement.addEventListener("mouseup", handleMouseUp);
    parentElement.addEventListener("dragstart", handleDragStart);
    parentElement.addEventListener("drag", handleDrag);
    parentElement.addEventListener("dragend", handleDragEnd);
    
    if (!hideOnTouch) {
      parentElement.addEventListener("touchstart", handleTouchStart, eventOptions);
      parentElement.addEventListener("touchmove", handleTouchMove, eventOptions);
      parentElement.addEventListener("touchend", handleTouchEnd);
    }

    // Global mouse up handler
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Cleanup with minimal operations
      parentElement.style.cursor = "";
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", handleMouseEnter);
      parentElement.removeEventListener("mouseleave", handleMouseLeave);
      parentElement.removeEventListener("mousedown", handleMouseDown);
      parentElement.removeEventListener("mouseup", handleMouseUp);
      parentElement.removeEventListener("dragstart", handleDragStart);
      parentElement.removeEventListener("drag", handleDrag);
      parentElement.removeEventListener("dragend", handleDragEnd);
      
      if (!hideOnTouch) {
        parentElement.removeEventListener("touchstart", handleTouchStart);
        parentElement.removeEventListener("touchmove", handleTouchMove);
        parentElement.removeEventListener("touchend", handleTouchEnd);
      }
      
      document.removeEventListener("mouseup", handleMouseUp);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition, hideOnTouch, isTouchDevice]);

  // Ultra-fast render with minimal DOM operations
  if (hideOnTouch && isTouchDevice) {
    return <div ref={containerRef} style={{ display: 'none' }} />;
  }

  return (
    <>
      <div ref={containerRef} style={{ position: 'absolute', pointerEvents: 'none' }} />
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[9999]"
            style={{
              top: springY,
              left: springX,
              x: "-50%",
              y: "-50%",
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: isPressed || isDragging ? 0.8 : 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 1200,
              damping: 40,
              mass: 0.02,
              duration: 0.1,
            }}
            {...props}
          >
            {children || (
              <motion.div
                animate={{
                  rotate: isDragging ? -45 : -70,
                  scale: isPressed ? 1.2 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 800,
                  damping: 20,
                  mass: 0.01,
                }}
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 16 16"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "stroke-neutral-950 text-amber-400 drop-shadow-sm transition-colors duration-75",
                    isPressed && "text-amber-300",
                    isDragging && "text-blue-400",
                    className,
                  )}
                  style={{
                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                  }}
                >
                  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}