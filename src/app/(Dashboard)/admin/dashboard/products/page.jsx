"use client";

import ProductCard from "@/components/other/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Card, CardTitle } from "../../../../../components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

const cardData = [
  {
    id: 1,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Out of stock",
  },
  {
    id: 2,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Out of stock",
  },
  {
    id: 3,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
  {
    id: 4,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
  {
    id: 5,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
  {
    id: 6,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
  {
    id: 7,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Out of stock",
  },
  {
    id: 8,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Out of stock",
  },
  {
    id: 9,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
  {
    id: 10,
    title: "Heading",
    description: "Description",
    price: "399",
    stock: "Available",
  },
];

const Page = () => {
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const filteredProducts = isOutOfStock
    ? cardData.filter((item) => item.stock === "Out of stock")
    : cardData;

  return (
    <div>
      <div className="pt-5 flex justify-between items-center">
        <h2 className="md:text-3xl text-xl font-semibold">All Products</h2>
        <div className="flex items-center gap-2">
          <Input type="text" placeholder="Search" />
          <Button type="submit">Search</Button>
        </div>
      </div>

      <div className="flex justify-between md:py-5 py-8">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isOutOfStock}
            onCheckedChange={setIsOutOfStock}
            id="out-of-stock"
          />
          <Label htmlFor="out-of-stock">Out of stocks</Label>
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        <Card>
          <Link href="/admin/dashboard/products/create-product">
            <div className="flex flex-col gap-5 justify-center items-center w-full py-10 hover:text-primary duration-300">
              <Plus size={48} />
              <CardTitle className="text-xl">Create Product</CardTitle>
            </div>
          </Link>
        </Card>
        {filteredProducts.map(
          ({ id, title, description, price, stock, image }) => (
            <div key={id}>
              <ProductCard
                title={title}
                description={description}
                price={price}
                stock={stock}
                image={image}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
