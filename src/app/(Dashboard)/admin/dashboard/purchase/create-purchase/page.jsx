"use client";

import { PurchaseInput } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import data from "./data";
import { CustomTable } from "@/components/customTable";

function formatDate(date) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

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
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date);
  const [value, setValue] = useState(formatDate(date));
  const [open, setOpen] = useState(false);
  return (
    <div className="px-2 py-2">
      <div className="">
        {/* Bill Info */}
        <div className="space-y-3">
          <div>
            <div className="space-y-3">
              <Label>Invoice No.</Label>
              <PurchaseInput type="text" placeholder="" className={"bg-none"} />
            </div>
          </div>
          <div className="grid grid-cols-[70%_20%] items-center gap-4">
            <div className="space-y-3">
              <Label>Party Name</Label>
              <PurchaseInput type="text" placeholder="" className={"bg-none"} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Date
              </Label>
              <div className="relative flex gap-2">
                <Input
                  id="date"
                  value={value}
                  placeholder="June 01, 2025"
                  className="bg-background pr-10"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant="ghost"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="taxable">Purchase Type</Label>
            <Select name="taxable">
              <SelectTrigger>
                <SelectValue placeholder="Is this a GST bill?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">GST Purchase</SelectItem>
                <SelectItem value="false">Non-GST Purchase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className={"my-3 border"} />
        {/* Products Bill */}
        <div className="w-full">
          <div>
            <CustomTable data={data} customColumns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
