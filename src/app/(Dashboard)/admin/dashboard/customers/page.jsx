import { DataTable } from "@/components/data-table";
import React from "react";
import data from "./data";

const page = () => {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
};

export default page;
