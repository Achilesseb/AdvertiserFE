"use client";
import React from "react";
import { AllTeamsPage } from "@/Components/Teams/AllTeamsPage";

const TeamsPage = ({
  searchParams,
}: {
  searchParams: Record<string, string | boolean>;
}) => <AllTeamsPage searchParams={searchParams} />;

export default TeamsPage;
