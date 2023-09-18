"use client";
import React from "react";
import { AllDevicesPage } from "@/Components/Devices/AllDevicesPage";
import { AllDriversPage } from "@/Components/Drivers/AllDriversPage";

const DevicesPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => <AllDriversPage searchParams={searchParams} />;

export default DevicesPage;
