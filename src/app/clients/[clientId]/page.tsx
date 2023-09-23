"use client";

import { ManageClient } from "@/Components/Clients/ManageClient";

const DevicePage = ({ params }: { params: { clientId: string } }) => {
  return <ManageClient searchParams={params} isEditForm />;
};
export default DevicePage;
