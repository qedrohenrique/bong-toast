"use client";

import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  useBongToast,
  type ToastData,
  type ToastPosition,
  type ToastSize,
  type ToastStyle,
  type ToastSpring,
} from "./use-bong-toast";
import "./bong-toast.css";

const icons: Record<string, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 18 18" fill="none" className="bong-toast-icon">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 18 18" fill="none" className="bong-toast-icon">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 18 18" fill="none" className="bong-toast-icon">
      <path d="M9 2L16.5 15.5H1.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="13" r="0.75" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 18 18" fill="none" className="bong-toast-icon">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  ),
};

const sizeConfig: Record<ToastSize, { maxWidth: number; padding: string; titleSize: number; descSize: number; iconSize: number }> = {
  sm: { maxWidth: 320, padding: "10px 14px", titleSize: 13, descSize: 12, iconSize: 16 },
  md: { maxWidth: 420, padding: "14px 18px", titleSize: 14, descSize: 13, iconSize: 18 },
  lg: { maxWidth: 520, padding: "18px 22px", titleSize: 16, descSize: 14, iconSize: 22 },
};

const defaultSpring: ToastSpring = { stiffness: 400, damping: 25, mass: 0.8 };

interface BongToastProps {
  position?: ToastPosition;
  maxVisible?: number;
  /** Default spring config for all toasts (can be overridden per-toast) */
  spring?: ToastSpring;
  /** Default size for all toasts (can be overridden per-toast) */
  size?: ToastSize;
  /** Default style for all toasts (can be overridden per-toast) */
  style?: ToastStyle;
  /** Default duration in ms for all toasts (can be overridden per-toast) */
  duration?: number;
}

function ToastItem({
  toast,
  onDismiss,
  isTop,
  defaultSpringConfig,
  defaultSize,
  defaultStyle,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
  isTop: boolean;
  defaultSpringConfig: ToastSpring;
  defaultSize: ToastSize;
  defaultStyle?: ToastStyle;
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!toast.duration) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const spring = { ...defaultSpringConfig, ...toast.spring };
  const size = toast.size ?? defaultSize;
  const sc = sizeConfig[size];
  const mergedStyle: ToastStyle = { ...defaultStyle, ...toast.style };

  const itemStyle: React.CSSProperties = {
    ...(mergedStyle.bg ? { "--toast-bg": mergedStyle.bg } as React.CSSProperties : {}),
    ...(mergedStyle.fg ? { "--toast-fg": mergedStyle.fg } as React.CSSProperties : {}),
    ...(mergedStyle.borderColor ? { "--toast-border": mergedStyle.borderColor } as React.CSSProperties : {}),
    ...(mergedStyle.borderRadius !== undefined ? { borderRadius: `${mergedStyle.borderRadius}px` } : {}),
    width: "fit-content",
    maxWidth: sc.maxWidth,
    padding: sc.padding,
  };

  const hasDescription = !!toast.description;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: spring.stiffness,
          damping: spring.damping,
          mass: spring.mass,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: 60,
        transition: { duration: 0.25, ease: "easeIn" },
      }}
      className="bong-toast-item"
      data-variant={toast.variant}
      style={itemStyle}
      onClick={() => onDismiss(toast.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: isTop ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header row: icon + title + chevron */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "fit-content" }}>
        {toast.variant && toast.variant !== "default" && (
          <div style={{ width: sc.iconSize, height: sc.iconSize, flexShrink: 0 }}>
            <svg viewBox="0 0 18 18" fill="none" style={{ width: "100%", height: "100%", color: "var(--toast-accent)" }}>
              {toast.variant === "success" && (
                <>
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
              {toast.variant === "error" && (
                <>
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
              {toast.variant === "warning" && (
                <>
                  <path d="M9 2L16.5 15.5H1.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 7V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="13" r="0.75" fill="currentColor" />
                </>
              )}
              {toast.variant === "info" && (
                <>
                  <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
                </>
              )}
            </svg>
          </div>
        )}
        <div style={{ fontWeight: 600, fontSize: sc.titleSize, lineHeight: 1.3, whiteSpace: "nowrap" }}>
          {toast.title}
        </div>
        {hasDescription && (
          <motion.div
            animate={{ rotate: hovered ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              flexShrink: 0,
              width: 12,
              height: 12,
              opacity: 0.35,
            }}
          >
            <svg viewBox="0 0 14 14" fill="none" style={{ width: "100%", height: "100%" }}>
              <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Description: separate block below, independent width */}
      {hasDescription && (
        <motion.div
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 0.6 : 0,
            marginTop: hovered ? 6 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
            mass: 0.5,
          }}
          style={{ overflow: "hidden", fontSize: sc.descSize, lineHeight: 1.5 }}
        >
          {toast.description}
        </motion.div>
      )}
    </motion.div>
  );
}

export function BongToast({
  position = "bottom-right",
  maxVisible = 5,
  spring: globalSpring,
  size: globalSize = "md",
  style: globalStyle,
  duration: globalDuration,
}: BongToastProps) {
  const { toasts, dismiss } = useBongToast();

  const handleDismiss = useCallback(
    (id: string) => dismiss(id),
    [dismiss]
  );

  const mergedDefaultSpring = { ...defaultSpring, ...globalSpring };

  const positionStyles: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    pointerEvents: "none",
    padding: "20px",
    ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("right") ? { right: 0 } : { left: 0 }),
    ...(position.includes("left")
      ? { alignItems: "flex-start" }
      : { alignItems: "flex-end" }),
  };

  const visibleToasts = toasts.slice(0, maxVisible);

  return (
    <>
      {/* SVG Gooey Filter */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="bong-toast-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div style={positionStyles} className="bong-toast-container">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleToasts.map((t, index) => (
            <ToastItem
              key={t.id}
              toast={{
                ...t,
                duration: t.duration ?? globalDuration ?? 4000,
              }}
              onDismiss={handleDismiss}
              isTop={index === 0}
              defaultSpringConfig={mergedDefaultSpring}
              defaultSize={globalSize}
              defaultStyle={globalStyle}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
