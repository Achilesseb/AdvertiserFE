import { Snackbar } from "@/Components/SnackBar";
import { toast } from "react-hot-toast";

export const showSnackBar = <T extends {}>(
  response: T,
  entityName: string,
  mutationKey: string
) => {
  if (!response) return;
  return toast.custom(
    <Snackbar
      type="success"
      message={`${entityName} ${
        response?.[mutationKey as keyof T]
      } was successfully saved.`}
    />
  );
};
