import { EWFormTitleProps } from "./formAnnexes";
import { useCallback } from "react";

export const EWFormTitle = ({
  generateCustomSectionButtons,
  ...props
}: EWFormTitleProps) => {
  const generateSectionButtons = useCallback(() => {
    if (!generateCustomSectionButtons) {
      return null;
    }

    return generateCustomSectionButtons();
  }, [generateCustomSectionButtons]);

  return (
    <div className={`${props.formTitleStyles} `}>
      <h1 className="text-titleLarge font-bold  ">
        {props?.formTitle as string}
      </h1>
      {generateSectionButtons()}
    </div>
  );
};
