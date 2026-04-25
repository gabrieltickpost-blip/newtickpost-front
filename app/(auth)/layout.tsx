import type { ReactNode } from "react";
import { GuestGuard } from "@/modules/auth/guards/GuestGuard";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
