"use client";
import React from "react";
import { AllDevicesPage } from "@/Components/Devices/AllDevicesPage";

const DevicesPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => <AllDevicesPage searchParams={searchParams} />;

export default DevicesPage;
