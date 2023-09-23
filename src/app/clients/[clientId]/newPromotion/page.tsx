"use client";

import { ManagePromotion } from "@/Components/Promotions/ManagePromotion";

const DevicePage = ({ params }: { params: { clientId: string } }) => {
  return <ManagePromotion searchParams={params} />;
};
export default DevicePage;
