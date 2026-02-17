"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export type ToastSize = "sm" | "md" | "lg";

export interface ToastStyle {
  /** Background color (any CSS color) */
  bg?: string;
  /** Text color */
  fg?: string;
  /** Border color */
  borderColor?: string;
  /** Border radius in px */
  borderRadius?: number;
}

export interface ToastSpring {
  /** Spring stiffness (default: 400) */
  stiffness?: number;
  /** Spring damping (default: 25) */
  damping?: number;
  /** Spring mass (default: 0.8) */
  mass?: number;
}

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  size?: ToastSize;
  style?: ToastStyle;
  spring?: ToastSpring;
}

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms (default: 4000, 0 to disable) */
  duration?: number;
  /** Toast size: sm, md, lg (default: md) */
  size?: ToastSize;
  /** Custom colors and border radius */
  style?: ToastStyle;
  /** Spring animation config */
  spring?: ToastSpring;
}

type Listener = () => void;

let toasts: ToastData[] = [];
let listeners: Listener[] = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

let idCounter = 0;

export function toastStore() {
  return {
    subscribe(listener: Listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot() {
      return toasts;
    },
    add(options: ToastOptions): string {
      const id = `bong-toast-${++idCounter}`;
      const toast: ToastData = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
        duration: options.duration,
        size: options.size,
        style: options.style,
        spring: options.spring,
      };
      toasts = [toast, ...toasts];
      emitChange();
      return id;
    },
    dismiss(id: string) {
      toasts = toasts.filter((t) => t.id !== id);
      emitChange();
    },
    clear() {
      toasts = [];
      emitChange();
    },
  };
}

const store = toastStore();

export function useBongToast() {
  const currentToasts = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );

  const toast = useCallback((options: ToastOptions) => {
    return store.add(options);
  }, []);

  const dismiss = useCallback((id: string) => {
    store.dismiss(id);
  }, []);

  const clear = useCallback(() => {
    store.clear();
  }, []);

  return { toasts: currentToasts, toast, dismiss, clear };
}

// Allow imperative usage outside React
export const toast = (options: ToastOptions) => store.add(options);
export const dismissToast = (id: string) => store.dismiss(id);
