"use client";
import React from "react";
import { AllClientsPage } from "@/Components/Clients/AllClientsPage";

const ClientsPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => <AllClientsPage searchParams={searchParams} />;

export default ClientsPage;
