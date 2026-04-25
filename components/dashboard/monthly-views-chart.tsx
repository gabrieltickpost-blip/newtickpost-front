import {
  last3MonthsData,
  last6MonthsData,
  lastMonthData,
  lastYearData,
} from "@/mock-data/creator-dashboard";
import { CampaignViewsChart } from "@/modules/campaigns/components/monthly-views-chart";

export function MonthlyViewsChart() {
  return (
    <CampaignViewsChart
      chartSeries={{
        "1m": lastMonthData,
        "3m": last3MonthsData,
        "6m": last6MonthsData,
        "1y": lastYearData,
      }}
    />
  );
}
