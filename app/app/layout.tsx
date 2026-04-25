import type { ReactNode } from "react";

import { ProtectedAppLayout } from "@/components/app-shell/protected-app-layout";

export default function AppSegmentLayout({ children }: { children: ReactNode }) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
