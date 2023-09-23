"use client";
import React from "react";
import { AllDriversPage } from "@/Components/Drivers/AllDriversPage";

const DriversPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => <AllDriversPage searchParams={searchParams} />;

export default DriversPage;
