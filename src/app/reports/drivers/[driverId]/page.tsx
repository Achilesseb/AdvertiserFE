"use client";
import React from "react";
import { UniqueReportsPage } from "@/Components/Reports/AllClientsPromotionsReportsPage";
import { usePathname } from "next/navigation";

const DriversPage = ({ params }: { params: { driverId: string } }) => {
  const pathName = usePathname();
  const entity = pathName.split("/")[2];

  return <UniqueReportsPage driverId={params.driverId} entity={entity} />;
};

export default DriversPage;
