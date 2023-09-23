import DefaultButtonComponent from "@/Components/DefaultButton";

export const FormBasicButtons = ({
  handleCancelButton,
  handleSaveButton,
  isDirty,
}: {
  handleCancelButton: () => void;
  handleSaveButton?: () => void;
  isDirty: boolean;
}) => {
  return (
    <>
      <DefaultButtonComponent
        onButtonClick={handleCancelButton}
        buttonText={"Cancel"}
        styleType={isDirty ? "dirty" : "outlined"}
        modifier="w-1/2 mr-4"
        buttonType="button"
      />
      <DefaultButtonComponent
        buttonText={"Save"}
        buttonType={handleSaveButton ? "button" : "submit"}
        onButtonClick={handleSaveButton}
        styleType="filled"
        modifier="w-1/2"
      />
    </>
  );
};
