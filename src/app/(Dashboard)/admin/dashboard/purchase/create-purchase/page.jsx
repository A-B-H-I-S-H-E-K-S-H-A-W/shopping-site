"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PurchaseInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CustomTable } from "@/components/customTable";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// -------------------------
// Helpers
// -------------------------

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function calculateAmount(qty, rate, taxRate, purchaseType) {
  const q = parseFloat(qty) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(taxRate) || 0;

  let base = q * r;
  if (purchaseType === "true") {
    base += (base * t) / 100;
  }
  return base.toFixed(2);
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// -------------------------
// Columns
// -------------------------
const customColumns = [
  { accessorKey: "productName", header: "Product Name" },
  { accessorKey: "qty", header: "Quantity" },
  { accessorKey: "rate", header: "Rate" },
  { accessorKey: "taxRate", header: "Tax Rate" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>{row.getValue("amount")}</span>,
  },
];

// -------------------------
// Main Page Component
// -------------------------
export default function Page() {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date);
  const [open, setOpen] = useState(false);

  // 🔹 Manage purchase type (GST vs Non-GST)
  const [purchaseType, setPurchaseType] = useState("true");

  // 🔹 Manage table rows dynamically
  const [products, setProducts] = useState([]);
  const [newRow, setNewRow] = useState({
    productName: "",
    qty: "",
    rate: "",
    taxRate: "",
    amount: "",
  });

  // 🔹 Column visibility
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = useMemo(() => customColumns, []);

  const table = useReactTable({
    data: products,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  // 🔹 Handle Add Product
  const handleAddProduct = () => {
    if (!newRow.productName || !newRow.qty || !newRow.rate) return;

    const amount =
      parseFloat(newRow.qty) * parseFloat(newRow.rate) +
      (purchaseType === "true"
        ? (parseFloat(newRow.qty) *
            parseFloat(newRow.rate) *
            parseFloat(newRow.taxRate || 0)) /
          100
        : 0);

    setProducts([...products, { ...newRow, amount }]);

    // Reset newRow
    setNewRow({
      productName: "",
      qty: "",
      rate: "",
      taxRate: "",
      amount: "",
    });
  };

  // 🔹 Update column visibility when purchaseType changes
  React.useEffect(() => {
    if (purchaseType === "false") {
      setColumnVisibility((prev) => ({ ...prev, taxRate: false }));
    } else {
      setColumnVisibility((prev) => ({ ...prev, taxRate: true }));
    }
  }, [purchaseType]);

  return (
    <div className="px-2 py-2 space-y-6">
      {/* ---------------- Bill Info ---------------- */}
      <BillInfo
        date={date}
        setDate={setDate}
        month={month}
        setMonth={setMonth}
        open={open}
        setOpen={setOpen}
        purchaseType={purchaseType}
        setPurchaseType={setPurchaseType}
      />

      <Separator className="my-3 border" />

      {/* ---------------- Products ---------------- */}
      <ProductsTable
        table={table}
        newRow={newRow}
        setNewRow={setNewRow}
        handleAddProduct={handleAddProduct}
        purchaseType={purchaseType}
      />

      {/* ---------------- Product List ---------------- */}
      <CustomTable data={products} customColumns={customColumns} />

      {/* ---------------- Actions ---------------- */}
      <Actions />
    </div>
  );
}

// -------------------------
// Subcomponents
// -------------------------

function BillInfo({
  date,
  setDate,
  month,
  setMonth,
  open,
  setOpen,
  purchaseType,
  setPurchaseType,
}) {
  return (
    <div className="space-y-3">
      {/* Invoice */}
      <div className="space-y-3">
        <Label>Invoice No.</Label>
        <PurchaseInput type="text" className="bg-none" />
      </div>

      {/* Party Name + Date */}
      <div className="grid grid-cols-[70%_20%] items-center gap-4">
        <div className="space-y-3">
          <Label>Party Name</Label>
          <PurchaseInput type="text" className="bg-none" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="date">Date</Label>
          <div className="relative flex gap-2">
            <Input
              id="date"
              value={formatDate(date)}
              className="bg-background pr-10"
              onChange={(e) => {
                const d = new Date(e.target.value);
                if (isValidDate(d)) {
                  setDate(d);
                  setMonth(d);
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
                  onSelect={(d) => {
                    setDate(d);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Purchase Type */}
      <div className="space-y-3">
        <Label>Purchase Type</Label>
        <Select
          name="taxable"
          value={purchaseType}
          onValueChange={setPurchaseType}
        >
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
  );
}

function ProductsTable({
  table,
  newRow,
  setNewRow,
  handleAddProduct,
  purchaseType,
}) {
  const handleInputChange = (key, value) => {
    setNewRow((prev) => {
      const updated = { ...prev, [key]: value };

      // auto calculate amount
      updated.amount = calculateAmount(
        updated.qty,
        updated.rate,
        updated.taxRate,
        purchaseType
      );
      return updated;
    });
  };

  return (
    <div className="w-full py-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            {customColumns.map(({ accessorKey }) => {
              if (purchaseType === "false" && accessorKey === "taxRate")
                return null;

              return (
                <TableCell key={accessorKey}>
                  <Input
                    name={accessorKey}
                    id={accessorKey}
                    value={newRow[accessorKey] || ""}
                    onChange={(e) =>
                      handleInputChange(accessorKey, e.target.value)
                    }
                    // 🔹 make amount read-only
                    readOnly={accessorKey === "amount"}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
      <div className="py-3 flex justify-end">
        <Button type="button" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="mt-4 flex justify-end gap-3">
      <Link href="/admin/dashboard/products">
        <Button variant="outline">Cancel</Button>
      </Link>
      <Button type="submit">Save</Button>
    </div>
  );
}
