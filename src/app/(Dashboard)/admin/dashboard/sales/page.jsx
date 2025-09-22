import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import React from "react";

const cardsData = [
  {
    id: 1,
    description: "Today's Sale",
    value: "440",
    trend: "+12.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "",
    footerSub: "",
  },
  {
    id: 2,
    description: "New Customers",
    value: "102",
    trend: "-20%",
    trendIcon: IconTrendingDown,
    trendDirection: "down",
    footerMain: "",
    footerSub: "",
  },
  {
    id: 3,
    description: "Total Customers",
    value: "9,523",
    trend: "+12.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "",
    footerSub: "",
  },
  {
    id: 4,
    description: "Monthly Revenue",
    value: "₹ 73,990",
    trend: "+4.5%",
    trendIcon: IconTrendingUp,
    trendDirection: "up",
    footerMain: "",
    footerSub: "",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
