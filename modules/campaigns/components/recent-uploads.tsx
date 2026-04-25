import Image from "next/image";
import type { CampaignUpload } from "@/modules/campaigns/contracts";
import { Upload } from "lucide-react";

function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
  return views.toLocaleString();
}

export function RecentUploads({
  uploads,
}: {
  uploads: CampaignUpload[];
}) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Uploads recentes</span>
        <Upload className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex h-full w-full gap-2">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="group relative h-full aspect-4/5 cursor-pointer overflow-hidden rounded-lg border border-white/20"
          >
            <Image
              src={upload.imageUrl}
              alt="Upload thumbnail"
              fill
              sizes="(max-width: 1024px) 25vw, 12vw"
              className="h-full w-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-60% to-black/70" />
            <div className="absolute right-[4px] bottom-[6px] left-[4px] flex items-center justify-between gap-2 rounded-md bg-background px-2.5 py-1.5">
              <span className="truncate text-xs font-medium text-foreground">
                {formatViews(upload.views)} views
              </span>
              <span className="shrink-0 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {upload.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
