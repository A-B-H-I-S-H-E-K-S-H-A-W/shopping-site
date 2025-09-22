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

export const ProductCard = ({ title, description, price, stock, image }) => {
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

export const PurchaseCard = ({
  id,
  description,
  value,
  trend,
  footerMain,
  footerSub,
}) => {
  return (
    <div>
      <Card key={id} className="@container/card">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{trend}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {footerMain}
          </div>
          <div className="text-muted-foreground">{footerSub}</div>
        </CardFooter>
      </Card>
    </div>
  );
};
