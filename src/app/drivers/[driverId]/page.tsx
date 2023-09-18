"use client";

import { ManageDriver } from "@/Components/Drivers/ManageDriver";

const DevicePage = ({ params }: { params: { driverId: string } }) => {
  return <ManageDriver searchParams={params} isEditForm />;
};
export default DevicePage;
