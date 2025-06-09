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
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [isActive, setIsActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    const now = performance.now();
    if (now - lastUpdateTime.current < 8.33) return;
    lastUpdateTime.current = now;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      x.set(clientX);
      y.set(clientY);
    });
  }, [x, y]);

  useEffect(() => {
    if (hideOnTouch && isTouchDevice) return;
    if (typeof window === "undefined" || !containerRef.current) return;

    const el = containerRef.current.parentElement;
    if (!el) return;

    el.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) =>
      updateMousePosition(e.clientX, e.clientY);
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
      if (e.clientX || e.clientY) updateMousePosition(e.clientX, e.clientY);
    };
    const handleDragEnd = () => {
      setIsDragging(false);
      setIsPressed(false);
    };

    // Optional touch fallback
    const handleTouchStart = (e: TouchEvent) => {
      if (!hideOnTouch && e.touches[0]) {
        const t = e.touches[0];
        setIsPressed(true);
        setIsActive(true);
        updateMousePosition(t.clientX, t.clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!hideOnTouch && e.touches[0]) {
        const t = e.touches[0];
        updateMousePosition(t.clientX, t.clientY);
      }
    };
    const handleTouchEnd = () => {
      if (!hideOnTouch) {
        setIsPressed(false);
        setIsActive(false);
      }
    };

    const opts = { passive: true };

    el.addEventListener("mousemove", handleMouseMove, opts);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("drag", handleDrag);
    el.addEventListener("dragend", handleDragEnd);

    if (!hideOnTouch) {
      el.addEventListener("touchstart", handleTouchStart, opts);
      el.addEventListener("touchmove", handleTouchMove, opts);
      el.addEventListener("touchend", handleTouchEnd);
    }

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      el.style.cursor = "";
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("dragstart", handleDragStart);
      el.removeEventListener("drag", handleDrag);
      el.removeEventListener("dragend", handleDragEnd);

      if (!hideOnTouch) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      }

      document.removeEventListener("mouseup", handleMouseUp);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateMousePosition, hideOnTouch, isTouchDevice]);

  if (hideOnTouch && isTouchDevice) {
    return <div ref={containerRef} style={{ display: "none" }} />;
  }

  return (
    <>
      <div ref={containerRef} style={{ position: "absolute", pointerEvents: "none" }} />
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[9999]"
            style={{
              top: springY,
              left: springX,
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              pointerEvents: "none",
              ...style,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isPressed || isDragging ? 0.8 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
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
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 16 16"
                  height="25"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "text-amber-400 stroke-slate-900 transition-colors duration-75",
                    isPressed && "text-amber-300",
                    className
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
