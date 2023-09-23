"use client";

import { ManageTeam } from "@/Components/Teams/ManageTeam";

const DevicePage = ({ params }: { params: { teamId: string } }) => {
  return <ManageTeam searchParams={params} isEditForm />;
};
export default DevicePage;
