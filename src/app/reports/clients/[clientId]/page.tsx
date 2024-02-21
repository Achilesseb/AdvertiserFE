"use client";
import React from "react";
import { AllClientsPromotionsReportsPage } from "@/Components/Reports/AllClientsPromotionsReportsPage";

const DriversPage = ({ params }: { params: { clientId: string } }) => {
  return <AllClientsPromotionsReportsPage clientId={params.clientId} />;
};

export default DriversPage;
