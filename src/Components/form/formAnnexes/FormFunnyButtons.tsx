import DefaultButtonComponent from "@/Components/DefaultButton";
import { FormModalComponent } from "./FormModal";
import { FormFunnyButtonsPropTypes } from "./formAnnexes";

export const FormFunnyButtons = <DataType extends {}>({
  children,
  hasNextButton = false,
  nextButtonFunction,
  hasBackButton = false,
  backButtonFunction,
  isDirty = false,
  showModal,
  setShowModal,
  reset,
  buttonsStyleModifier,
}: FormFunnyButtonsPropTypes<DataType>) => {
  const {
    buttonsContainerStyle = "flex justify-evenly",
    submitButtonStyle,
    cancelButtonStyle,
    modalStyle,
  } = buttonsStyleModifier ?? {};

  const {
    modifiers: submitModifier = "ml-5 w-1/2",
    filled: submitFilled = "filled",
  } = submitButtonStyle ?? {};

  const {
    modifiers: cancelModifier = "w-1/2 mr-4",
    filled: cancelFilled = "outlined",
  } = cancelButtonStyle ?? {};

  const submitButtonType = hasNextButton ? "button" : "submit";
  const submitButtonText = hasNextButton ? "Next" : "Save";

  const cancelButtonText = hasBackButton ? "Back" : "Cancel";

  const leavePageFunction = () => {
    backButtonFunction();
    reset?.();
  };

  return (
    <div className={`w-full ${buttonsContainerStyle}`}>
      {isDirty ? (
        <FormModalComponent
          showModal={showModal}
          setShowModal={setShowModal}
          leavePageFunction={leavePageFunction}
          modalStyles={modalStyle}
        />
      ) : (
        <DefaultButtonComponent
          buttonText={cancelButtonText}
          buttonType="button"
          styleType={cancelFilled}
          onButtonClick={backButtonFunction}
          modifier={cancelModifier}
        />
      )}

      <DefaultButtonComponent
        buttonType={submitButtonType}
        styleType={submitFilled}
        buttonText={submitButtonText}
        disabled={false}
        modifier={submitModifier}
        onButtonClick={nextButtonFunction}
      />
      {children}
    </div>
  );
};
