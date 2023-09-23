import { ClientsValidationSchema } from "@/validationSchemas/devices";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Form from "../form/FormMain";
import {
  ADD_NEW_CLIENT,
  EDIT_CLIENT,
  GET_CLIENT_BY_ID,
} from "@/graphql/schemas/clientsSchema";
import { clientsNewFormTemplate } from "./clientsAnnexes/manageClientTemplate";
import { AllPromotionsPage } from "../Promotions/AllPromotionsPage";
import DefaultButtonComponent from "../DefaultButton";
import { ModeEdit } from "@/constants/svg";
import { FormBasicButtons } from "../form/formAnnexes/DefaultButtons";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";

export const ManageClient = ({
  searchParams,
  isEditForm = false,
}: ManageClientProps) => {
  const [isEditable, setIsEditable] = useState(!isEditForm);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
  const router = useRouter();

  const handleCancelFormSubmit = useCallback(() => {
    router.replace("/clients");
  }, [router]);

  const formStylesModifiers = {
    formContainerStyles:
      "h-auto flex flex-col items-center gap-4 justify-center w-full  px-0",
    formInputsContainerStyles: "grid grid-cols-2 w-full gap-x-20 gap-y-4",
    formTitleStyles:
      "flex gap-4 desktop:w-6/12 laptop:w-8/12 mb-8 mt-10 text-xl",
    formButtonContainerStyles: "mb-4 mt-10 flex w-5/12 ",
  };

  const clientsFormTemplate = {
    name: { ...clientsNewFormTemplate.name, disabled: !isEditable },
    email: { ...clientsNewFormTemplate.email, disabled: !isEditable },
    phone: { ...clientsNewFormTemplate.phone, disabled: !isEditable },
    address: { ...clientsNewFormTemplate.address, disabled: !isEditable },
    city: { ...clientsNewFormTemplate.city, disabled: !isEditable },
    cui: { ...clientsNewFormTemplate.cui, disabled: !isEditable },
  };
  const generateCustomFormButtons = (isDirty?: boolean) => {
    if (!isEditable && isEditForm) return null;

    return (
      <FormBasicButtons
        handleCancelButton={() => setIsEditable((prev) => !prev)}
        isDirty={isDirty as boolean}
      />
    );
  };

  useEffect(() => {
    if (updatedSuccessfully) {
      toast.custom(
        <Snackbar type="success" message={`Client updated succesfully`} />
      );
    }
    setUpdatedSuccessfully(false);
  }, [updatedSuccessfully, router]);

  const generateCustomSectionButtons = () => {
    if (isEditable || !isEditForm) return null;

    return (
      <DefaultButtonComponent
        iconLeft={<ModeEdit width="10" height="10" />}
        buttonType="button"
        buttonText={"Edit"}
        styleType="text"
        modifier="text-black h-8"
        onButtonClick={() => setIsEditable(true)}
      />
    );
  };
  if (!searchParams?.clientId && isEditForm)
    return <div>A fost o problema cu gasirea clientului selectat!</div>;

  return (
    <div className="flex flex-col">
      <Form
        headlessForm={false}
        queryExpression={GET_CLIENT_BY_ID}
        mutationExpression={isEditForm ? EDIT_CLIENT : ADD_NEW_CLIENT}
        validationSchema={ClientsValidationSchema}
        formTemplate={clientsFormTemplate}
        handleCancelButton={handleCancelFormSubmit}
        skipQuery={!isEditForm}
        formTitle="Informatii despre client"
        formStylesModifier={formStylesModifiers}
        generateCustomSectionButtons={generateCustomSectionButtons}
        generateCustomFormButtons={
          isEditForm ? (isDirty) => generateCustomFormButtons(isDirty) : null
        }
        {...(isEditForm && {
          entityID: searchParams?.clientId,
          entityVariable: "id",
          formSuccessAction: () => {
            setIsEditable(false);
            setUpdatedSuccessfully(true);
          },
        })}
        {...(!isEditForm && {
          redirectRoute: "/clients",
        })}
      />
      {isEditForm ? (
        <div className="px-20">
          <AllPromotionsPage clientId={searchParams?.clientId as string} />
        </div>
      ) : null}
    </div>
  );
};

type ManageClientProps = {
  searchParams?: {
    clientId?: string;
    action?: string;
    type?: "add" | "update";
  };
  isEditForm?: boolean;
};
