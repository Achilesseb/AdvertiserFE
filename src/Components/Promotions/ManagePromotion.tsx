import { PromotionsValidationSchema } from "@/validationSchemas/devices";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import Form from "../form/FormMain";
import {
  ADD_NEW_PROMOTION,
  EDIT_PROMOTION,
  GET_PROMOTION_BY_ID,
} from "@/graphql/schemas/promotionSchema";
import {
  PromotionsFormData,
  promotionsNewFormTemplate,
} from "./promotionsAnnexes/managePromotionTemplate";
import {
  deleteVideoFromS3,
  getVideoUrlAws,
  uploadVideoToS3,
} from "@/aws/awsHelpers";
import { FormTemplateDefinition } from "../form/formTemplate";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { MutationFunction, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";
import ReactPlayer from "react-player/lazy";
import { ModeEdit } from "@/constants/svg";
import InputComponent from "../form/formInputs/InputComponent";
import { getDuration } from "@/utils/videoDuration";

export const ManagePromotion = ({
  searchParams,
  isEditForm = false,
}: ManagePromotionProps) => {
  const videoEl = useRef(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [dataToRender, setDataToRender] = useState<PromotionsFormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [promoUrl, setPromoUrl] = useState<string>();
  const { clientId, promotionId } = searchParams ?? {};

  useQuery(GET_PROMOTION_BY_ID, {
    fetchPolicy: "network-only",
    skip: !isEditForm,
    variables: {
      id: promotionId,
    },
    onCompleted: async (data) => {
      const queryKey = Object.keys(data)[0];
      const url = await getVideoUrlAws(data[queryKey].fileName);
      setPromoUrl(url);

      setDataToRender(data[queryKey]);
    },
  });

  const router = useRouter();
  const handleCancelFormSubmit = useCallback(() => {
    router.replace(`/clients/${searchParams?.clientId}`);
  }, [router, searchParams?.clientId]);

  const formStylesModifiers = {
    formContainerStyles:
      "h-auto flex flex-col items-center gap-4 justify-center w-full px-0",
    formInputsContainerStyles: "flex flex-col w-full gap-x-20 gap-y-6",
    formTitleStyles:
      "flex justify-center gap-4 desktop:w-6/12 laptop:w-8/12 mb-6 mt-2 text-xl",
    formButtonContainerStyles: "mb-2 mt-2 flex w-6/12 ",
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;
    handleDuration(URL.createObjectURL(file));
    setSelectedFile(file);
  };
  const handleEditClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  const handleVideoFileLabel = () => {
    if (!selectedFile && !dataToRender?.fileName) return "Select video file";

    const labelName = selectedFile?.name ?? dataToRender?.fileName;

    if (!labelName) return "Select video file";

    return labelName?.length > 30 ? labelName?.substring(0, 30) : labelName;
  };

  const promotionFormTemplate: FormTemplateDefinition<PromotionsFormData> = {
    ...promotionsNewFormTemplate,
    duration: {
      element(_trigger, _erros, props) {
        const { setValue } = props as unknown as {
          setValue: UseFormSetValue<PromotionsFormData>;
        };
        setValue?.("duration", videoDuration ?? dataToRender?.duration ?? 0);

        return (
          <InputComponent
            disabled={true}
            name="duration"
            type="text"
            label="Video length"
            value={videoDuration ?? dataToRender?.duration}
          />
        );
      },
      ...promotionsNewFormTemplate.duration,
    },
    file: {
      type: "react-element",
      fieldName: "file",
      label: "Video file",

      element: () => {
        return (
          <div className="w-8/10 flex gap-4 items-center justify-between">
            <span>Video file: </span>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              style={{ textOverflow: "ellipsis" }}
              className="flex items-center truncate bg-primary-50 outline-none max-w-[18rem] px-2 h-12 border rounded-md p-4 focus:border-neutral-50 transition text-white ease-in-out duration-200 text-bodyLarge font-normal overflow-hidden whitespace-nowrap"
            >
              {handleVideoFileLabel()}
            </label>
            <button
              type="button"
              onClick={handleEditClick}
              className="flex gap-2 justify-evenly items-center bg-white text-primary-40 hover:bg-primary-99 focus:bg-primary-95 active:bg-primary-90 border-neutral-50 focus:border-primary-40 py-2.5 pr-2 pl-2 border-2 rounded-md"
            >
              <ModeEdit />
              Select video
            </button>
          </div>
        );
      },
    },
  };
  const customMutationHandler = async (
    data: PromotionsFormData,
    reset: UseFormReset<PromotionsFormData>,
    handlerMutation: MutationFunction
  ) => {
    let uniqueFileName;

    if (selectedFile) {
      const { name } = selectedFile;

      const fileNameWithoutExtension = name
        .split("\\")
        .pop()
        ?.replace(/\.[^/.]+$/, "");

      const timestamp = Date.now();
      const fileExtension = name?.split(".").pop();

      uniqueFileName = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
    }
    try {
      handlerMutation({
        variables: {
          input: {
            ...(!isEditForm && { clientId }),
            ...(isEditForm && { id: promotionId }),
            title: data?.title,
            description: data?.description ?? "",
            ...(uniqueFileName && {
              fileName: uniqueFileName ?? "",
            }),
            category: data?.category ?? "",
            url: data.url ?? "",
            duration: data?.duration ?? 0,
          },
        },
      });

      if (!uniqueFileName) return;

      await uploadVideoToS3(uniqueFileName, selectedFile as File);
      if (uniqueFileName !== dataToRender?.fileName && dataToRender?.fileName)
        await deleteVideoFromS3(dataToRender?.fileName);
    } catch (err) {
      reset();
      toast.custom(
        <Snackbar type="success" message={"Something went wrong!"} />
      );
    } finally {
      router.push(`/clients/${clientId}`);
      toast.custom(
        <Snackbar
          type="success"
          message={`Promotion ${!isEditForm ? "added" : "updated"} succesfully`}
        />
      );
    }
  };

  const handleDuration = (file: string) => {
    if (!file) return;
    getDuration(file, function (duration: number) {
      setVideoDuration(Math.round(duration));
    });
  };

  return (
    <div className="flex">
      <div className="w-6/12">
        <Form
          headlessForm={false}
          queryExpression={GET_PROMOTION_BY_ID}
          customFormData={dataToRender}
          mutationExpression={isEditForm ? EDIT_PROMOTION : ADD_NEW_PROMOTION}
          validationSchema={PromotionsValidationSchema}
          formTemplate={promotionFormTemplate}
          handleCancelButton={handleCancelFormSubmit}
          skipQuery
          formTitle="Informatii despre reclama"
          formStylesModifier={formStylesModifiers}
          redirectRoute={`/clients/${clientId}`}
          customFormSubmit={(
            data: PromotionsFormData,
            reset: UseFormReset<PromotionsFormData>,
            mutationHandler: MutationFunction
          ) => customMutationHandler(data, reset, mutationHandler)}
          {...(isEditForm &&
            promotionId && {
              entityID: promotionId,
              entityVariable: "id",
            })}
        />
      </div>
      <div className="flex justify-center items-start w-6/12 mt-20">
        {selectedFile || promoUrl ? (
          <ReactPlayer
            ref={videoEl}
            url={selectedFile ? URL.createObjectURL(selectedFile) : promoUrl}
            controls
          />
        ) : null}
      </div>
    </div>
  );
};

type ManagePromotionProps = {
  searchParams?: { clientId: string; promotionId?: string };
  isEditForm?: boolean;
};
