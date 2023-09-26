"use client";
import { ManageAddTeam } from "@/Components/Teams/ManageAddTeam";

const DevicePage = ({ params }: { params: { teamId: string } }) => {
  return <ManageAddTeam searchParams={params} isEditForm={false} />;
};
export default DevicePage;
