import { SectionCards } from "@/components/section-cards";
import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PurchaseCard } from "@/components/other/customCard";
import data from "../data";
import { DataTable } from "@/components/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";

const cardsData = [
  {
    id: 1,
    description: "Today's Sale",
    value: "440",
    trend: "+12.5%",
    footerMain: "",
    footerSub: "",
  },
  {
    id: 2,
    description: "New Customers",
    value: "102",
    trend: "-20%",
    footerMain: "",
    footerSub: "",
  },
  {
    id: 3,
    description: "Total Customers",
    value: "9,523",
    trend: "+12.5%",
    footerMain: "",
    footerSub: "",
  },
];

const page = () => {
  return (
    <>
      <div>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div
                className={
                  "grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:px-5 px-4"
                }
              >
                <Card>
                  <Link href="/admin/dashboard/purchase/create-purchase">
                    <div className="flex flex-col gap-5 justify-center items-center w-full hover:text-primary duration-300">
                      <Plus size={40} />
                      <CardTitle className="text-xl">Create Purchase</CardTitle>
                    </div>
                  </Link>
                </Card>
                {cardsData.map(
                  ({
                    id,
                    description,
                    value,
                    trend,
                    footerMain,
                    footerSub,
                  }) => (
                    <PurchaseCard
                      key={id}
                      id={id}
                      description={description}
                      value={value}
                      trend={trend}
                      footerMain={footerMain}
                      footerSub={footerSub}
                    />
                  )
                )}
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
