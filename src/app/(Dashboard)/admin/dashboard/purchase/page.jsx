"use client";

import { SectionCards } from "@/components/section-cards";
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { PurchaseCard } from "@/components/other/customCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomTable } from "@/components/customTable";
import data from "./create-purchase/data.json";

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

const columns = [
  {
    accessorKey: "invoiceNo",
    header: "Invoice No.",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>{row.getValue("amount")}</span>,
  },
  {
    accessorKey: "partyName",
    header: "Party Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const page = () => {
  return (
    <>
      <div className="md:px-5 px-4">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div
                className={
                  "grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 "
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
              <CustomTable data={data} customColumns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
