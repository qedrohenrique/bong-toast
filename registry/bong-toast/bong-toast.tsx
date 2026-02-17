"use client";

import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CircleCheck,
  CircleX,
  TriangleAlert,
  Info,
  ChevronDown,
} from "lucide-react";
import {
  useBongToast,
  type ToastData,
  type ToastPosition,
  type ToastSize,
  type ToastStyle,
  type ToastSpring,
} from "./use-bong-toast";
import { cn } from "@/lib/utils";

const variantIcons = {
  success: CircleCheck,
  error: CircleX,
  warning: TriangleAlert,
  info: Info,
} as const;

const variantClasses: Record<string, string> = {
  default: "",
  success: "border-l-[3px] border-l-emerald-500",
  error: "border-l-[3px] border-l-red-500",
  warning: "border-l-[3px] border-l-amber-500",
  info: "border-l-[3px] border-l-blue-500",
};

const variantIconColor: Record<string, string> = {
  success: "text-emerald-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

const sizeConfig: Record<
  ToastSize,
  {
    maxWidth: string;
    padding: string;
    titleSize: string;
    descSize: string;
    iconSize: number;
  }
> = {
  sm: {
    maxWidth: "max-w-xs",
    padding: "px-3.5 py-2.5",
    titleSize: "text-xs",
    descSize: "text-[12px]",
    iconSize: 16,
  },
  md: {
    maxWidth: "max-w-[420px]",
    padding: "px-4.5 py-3.5",
    titleSize: "text-sm",
    descSize: "text-[13px]",
    iconSize: 18,
  },
  lg: {
    maxWidth: "max-w-[520px]",
    padding: "px-5.5 py-4.5",
    titleSize: "text-base",
    descSize: "text-sm",
    iconSize: 22,
  },
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
  const variant = toast.variant ?? "default";
  const IconComponent =
    variant !== "default"
      ? variantIcons[variant as keyof typeof variantIcons]
      : null;

  const customVars: React.CSSProperties = {
    ...(mergedStyle.bg
      ? ({ "--toast-bg": mergedStyle.bg } as React.CSSProperties)
      : {}),
    ...(mergedStyle.fg
      ? ({ "--toast-fg": mergedStyle.fg } as React.CSSProperties)
      : {}),
    ...(mergedStyle.borderColor
      ? ({ "--toast-border": mergedStyle.borderColor } as React.CSSProperties)
      : {}),
    ...(mergedStyle.borderRadius !== undefined
      ? { borderRadius: `${mergedStyle.borderRadius}px` }
      : {}),
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
      className={cn(
        "w-fit overflow-hidden pointer-events-auto cursor-pointer select-none",
        "bg-[var(--toast-bg,oklch(0.21_0_0))] text-[var(--toast-fg,oklch(0.985_0_0))]",
        "border border-[var(--toast-border,oklch(1_0_0/10%))] rounded-[14px]",
        "shadow-[0_8px_32px_oklch(0_0_0/25%),0_2px_8px_oklch(0_0_0/15%)]",
        "backdrop-blur-[12px]",
        sc.maxWidth,
        sc.padding,
        variantClasses[variant] ?? "",
      )}
      style={customVars}
      onClick={() => onDismiss(toast.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: isTop ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header row: icon + title + chevron */}
      <div className="flex items-center gap-2 w-full min-w-0">
        {IconComponent && (
          <IconComponent
            size={sc.iconSize}
            className={cn("shrink-0", variantIconColor[variant] ?? "")}
          />
        )}
        <div
          className={cn(
            "font-semibold leading-[1.3] truncate min-w-0",
            sc.titleSize,
          )}
        >
          {toast.title}
        </div>
        {hasDescription && (
          <motion.div
            animate={{ rotate: hovered ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="shrink-0 opacity-35"
          >
            <ChevronDown size={12} />
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
          className={cn(
            "overflow-hidden leading-[1.5]",
            sc.descSize,
            !hovered && "w-0",
          )}
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

  const handleDismiss = useCallback((id: string) => dismiss(id), [dismiss]);

  const mergedDefaultSpring = { ...defaultSpring, ...globalSpring };

  const visibleToasts = toasts.slice(0, maxVisible);

  return (
    <div
      className={cn(
        "fixed z-[9999] flex flex-col gap-2.5 pointer-events-none p-5",
        position.includes("top") ? "top-0" : "bottom-0",
        position.includes("right") ? "right-0" : "left-0",
        position.includes("left") ? "items-start" : "items-end",
      )}
    >
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
  );
}
