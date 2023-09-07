"use client";
import { ManageDevice } from "@/Components/Devices/ManageDevice";

const DevicePage = ({ params }: { params: { deviceId: string } }) => {
  return <ManageDevice searchParams={params} isEditForm />;
};
export default DevicePage;
