import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import data from "./data.json";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

const cardsData = [
  {
    id: 1,
    description: "Total Revenue",
    value: "$1,250.00",
    trend: "+12.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "Trending up this month",
    footerSub: "Visitors for the last 6 months",
  },
  {
    id: 2,
    description: "New Customers",
    value: "1,234",
    trend: "-20%",
    trendIcon: IconTrendingDown,
    trendDirection: "down",
    footerMain: "Down 20% this period",
    footerSub: "Acquisition needs attention",
  },
  {
    id: 3,
    description: "Active Accounts",
    value: "45,678",
    trend: "+12.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "Strong user retention",
    footerSub: "Engagement exceed targets",
  },
  {
    id: 4,
    description: "Growth Rate",
    value: "4.5%",
    trend: "+4.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "Steady performance increase",
    footerSub: "Meets growth projections",
  },
];

const page = () => {
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards cardsData={cardsData} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
