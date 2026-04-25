"use client";

export function useToast() {
  return {
    success: (message: string) => window.alert(message),
    error: (message: string) => window.alert(message),
    info: (message: string) => window.alert(message),
  };
}
