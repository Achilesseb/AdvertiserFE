"use client";

import { GET_ALL_DEVICES } from "@/graphql/schemas/devicesSchema";
import { createColumnHelper, ColumnDefBase } from "@tanstack/react-table";
import dayjs from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Snackbar } from "./SnackBar";
import { TableComponent } from "./Table/Table";
import { TableHeaderElement } from "./Table/TableHeader";
import { useMutation } from "@apollo/client";
import {
  ADD_NEW_CONSTANT,
  DELETE_CONSTANTS,
  EDIT_CONSTANT,
  GET_ALL_CONSTANTS,
  GET_CONSTANT_BY_ID,
} from "@/graphql/schemas/constantsSchema";
import {
  ConstantsValidationSchema,
  DevicesValidationSchema,
} from "@/validationSchemas/devices";
import Form from "./form/FormMain";
import { FormTemplateDefinition } from "./form/formTemplate";

export type ConstantModel = {
  id: string;
  identifier: string;
  constant: number;
  inUse: boolean;
  createdAt: string;
};

const constantsForm: FormTemplateDefinition<ConstantModel> = {
  identifier: {
    fieldName: "identifier",
    label: "Constat identifier",
    type: "input",
    labelRequired: true,
    labelRequiredClassName: "text-error-40",
    i18nIdentifier: "service-details",
    constraints: {
      max: 500,
      min: 15,
    },
  },
  constant: {
    fieldName: "constant",
    label: "Constant value",
    type: "input",
    containerClassName: "w-full relative z-30 ",
    i18nIdentifier: "driver-name",
    constraints: {
      max: 200,
      min: 5,
    },
    labelRequired: true,
    labelRequiredClassName: "text-error-40",
    errorTextClassName:
      "absolute text-error-40 left-0 bottom-0  text-labelSmall block text-right",
  },

  inUse: {
    fieldName: "inUse",
    label: "Constant in use",
    type: "checkbox",
    containerClassName: "w-full relative z-10",
    disabled: false,
    excludeFromMutation: false,
    defaultFieldValue: false,
    constraints: {
      max: 200,
      min: 5,
    },
  },
};

const columnHelper = createColumnHelper<ConstantModel>();

const defaultConstantsColumns = [
  columnHelper.accessor("identifier", {
    header: "Constant",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("constant", {
    header: "Value",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("inUse", {
    header: "In Use",
    cell: (info) =>
      info.getValue() ? (
        <div className="flex justify-center">
          <AiOutlineCheck color="#008000" />
        </div>
      ) : (
        <div className="flex justify-center">
          <AiOutlineClose color="#FF0000" />
        </div>
      ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
    footer: (info) => info.column.id,
  }),
];

export const generateConstantsTableHeaderElements = (
  router?: AppRouterInstance
): Record<string, TableHeaderElement> => ({
  addNew: {
    type: "button",
    buttonText: "Add new constant",
    style: "filled",
    styleModifiers: "col-start-4 col-end-9",
  },
  delete: {
    type: "button",
    buttonText: "Delete",
    style: "outlined",
    styleModifiers: "col-start-9 col-end-11",
  },
});

export const AllConstantsPage = () => {
  const [toDeleteDataIds, setToDeleteDataIds] = useState<Array<string>>([]);
  const [showEmbededForm, setShowEmbededForm] = useState<boolean>(false);
  const [clickableEntityId, setClickableEntityId] = useState<string>();
  const router = useRouter();
  console.log(clickableEntityId);
  //   useEffect(() => {
  //     if (searchParams?.action === "true") {
  //       router.replace("/devices");
  //       toast.custom(
  //         <Snackbar
  //           type="success"
  //           message={`Device ${
  //             searchParams?.type === "add" ? "added" : "updated"
  //           } succesfully`}
  //         />
  //       );
  //     }
  //   }, [searchParams, router]);
  const [deleteEntities] = useMutation(DELETE_CONSTANTS, {
    variables: {
      devicesIds: toDeleteDataIds,
    },
  });

  const constantsTableHeaderElements = generateConstantsTableHeaderElements();

  const polishedConstantsTableHeaderElements = {
    delete: {
      ...constantsTableHeaderElements.delete,
      onClick: deleteEntities,
    },
    addNew: {
      ...constantsTableHeaderElements.addNew,
      onClick: () => setShowEmbededForm(true),
    },
  };
  const formStylesModifiers = {
    formContainerStyles:
      "relative h-full  w-full flex flex-col gap-4 justify-start left-0 bg-white rounded-xl px-10 top-0",
    formInputsContainerStyles: "flex flex-col gap-4 mb-4 mt-4",
    formTitleStyles:
      "flex justify-between desktop:w-8/12 laptop:w-12/12 mb-2 mt-2 ",
    formButtonContainerStyles: "mb-4  bottom-0 w-full flex",
  };
  console.log(clickableEntityId);
  return (
    <div className="h-full px-10 py-4 flex flex-col gap-4 w-full">
      {showEmbededForm || clickableEntityId ? (
        <Form
          headlessForm={false}
          queryExpression={GET_CONSTANT_BY_ID}
          mutationExpression={
            clickableEntityId ? EDIT_CONSTANT : ADD_NEW_CONSTANT
          }
          validationSchema={ConstantsValidationSchema}
          formTemplate={constantsForm}
          handleCancelButton={() => {
            setShowEmbededForm(false);
            setClickableEntityId(undefined);
          }}
          skipQuery={!clickableEntityId}
          formStylesModifier={formStylesModifiers}
          formSuccessAction={() => {
            setShowEmbededForm(false);
            setClickableEntityId(undefined);
          }}
          {...(clickableEntityId && {
            entityVariable: "id",
            entityID: clickableEntityId,
          })}
        />
      ) : (
        <TableComponent<ConstantModel>
          headerData="Constants data"
          fetchPolicy="network-only"
          apolloQuery={GET_ALL_CONSTANTS}
          setToDeleteDataIds={setToDeleteDataIds}
          rowClickFunction={(row) => {
            setClickableEntityId(row.original.id);
          }}
          columns={
            defaultConstantsColumns as unknown as Array<
              ColumnDefBase<ConstantModel, string>
            >
          }
          polishedHeaderElements={polishedConstantsTableHeaderElements}
        />
      )}
    </div>
  );
};
