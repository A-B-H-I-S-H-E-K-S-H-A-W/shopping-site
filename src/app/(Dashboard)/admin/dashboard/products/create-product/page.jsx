"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CreateProductPage() {
  return (
    <form className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Create New Product</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details to add a product to your store.
        </p>
      </div>

      {/* Product Name */}
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter product description"
        />
      </div>

      {/* Brand */}
      <div className="grid gap-2">
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" name="brand" placeholder="Enter brand name" />
      </div>

      {/* Product Type */}
      <div className="grid gap-2">
        <Label htmlFor="productType">Product Type</Label>
        <Input
          id="productType"
          name="productType"
          placeholder="E.g. Electronics, Clothing"
        />
      </div>

      {/* Features */}
      <div className="grid gap-2">
        <Label htmlFor="features">Features</Label>
        <Input
          id="features"
          name="features"
          placeholder="Enter features (comma separated)"
        />
      </div>

      {/* Weight & Unit */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="weight">Weight</Label>
          <Input id="weight" name="weight" placeholder="500g, 1kg" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="unit">Unit</Label>
          <Select name="unit" required>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pcs">Pieces (pcs)</SelectItem>
              <SelectItem value="box">Box</SelectItem>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="ltr">Liter (ltr)</SelectItem>
              <SelectItem value="ml">Milliliter (ml)</SelectItem>
              <SelectItem value="dozen">Dozen</SelectItem>
              <SelectItem value="pack">Pack</SelectItem>
              <SelectItem value="set">Set</SelectItem>
              <SelectItem value="meter">Meter</SelectItem>
              <SelectItem value="cm">Centimeter</SelectItem>
              <SelectItem value="inch">Inch</SelectItem>
              <SelectItem value="sqft">Square Foot (sqft)</SelectItem>
              <SelectItem value="sqmt">Square Meter (sqmt)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* HSN Code & GST Rate */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="hsnCode">HSN Code</Label>
          <Input
            id="hsnCode"
            name="hsnCode"
            placeholder="Enter HSN code"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gstRate">GST Rate (%)</Label>
          <Input
            id="gstRate"
            name="gstRate"
            type="number"
            placeholder="18"
            required
          />
        </div>
      </div>

      {/* Taxable */}
      <div className="grid gap-2">
        <Label htmlFor="taxable">Taxable</Label>
        <Select name="taxable">
          <SelectTrigger>
            <SelectValue placeholder="Is this product taxable?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rate */}
      <div className="grid gap-2">
        <Label htmlFor="rate">Rate</Label>
        <Input id="rate" name="rate" type="number" placeholder="399" required />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/dashboard/products">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
