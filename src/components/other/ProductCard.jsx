import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ProductCard = ({ title, description, price, stock, image }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <span>{price}</span>
          <CardAction>
            {stock === "Out of stock" ? (
              <Badge variant={"destructive"}>{stock}</Badge>
            ) : (
              <Badge variant={"secondary"}>{stock}</Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Image</p>
        </CardContent>
        <CardFooter className={"gap-2"}>
          <Button variant={"secondary"}>Edit</Button>
          <Button variant={"destructive"}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
