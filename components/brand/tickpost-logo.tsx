import Image from "next/image";

import { cn } from "@/lib/utils";

export function TickpostLogo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 shrink-0 items-center",
        className,
      )}
    >
      <Image
        src="/logo.svg"
        alt="Tickpost"
        width={611}
        height={112}
        priority
        className={cn(
          "h-full w-auto object-contain dark:[filter:invert(1)_hue-rotate(180deg)]",
          imageClassName,
        )}
      />
    </span>
  );
}
