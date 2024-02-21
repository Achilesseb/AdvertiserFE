"use client";
import React from "react";
import { ReportsPage } from "@/Components/Reports/AllClientsReportsPage";

import { useSearchParams } from "next/navigation";

const DriversPage = () => {
  const { get } = useSearchParams();
  const entity = get("entity");

  return <ReportsPage {...(entity && { entity })} />;
};

export default DriversPage;
