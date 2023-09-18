import DefaultButtonComponent from "@/Components/DefaultButton";
import { DefaultModal } from "./DefaultModal";
import { FormModalComponentPropTypes } from "./formAnnexes";

export const FormModalComponent = ({
  showModal,
  setShowModal,
  leavePageFunction,
  modalStyles,
}: FormModalComponentPropTypes) => {
  const {
    leavePageButtonStyle,
    cancelPageButtonStyle,
    overflowOptions = "",
    modalButtonModifier = "w-1/2 mr-4",
  } = modalStyles ?? {};

  const {
    modifiers: leavePageModifiers = "",
    filled: leavePageFilled = "filled",
  } = leavePageButtonStyle ?? {};
  const {
    modifiers: cancelButtonModifiers = "",
    filled: cancelButtonFilled = "outlined",
  } = cancelPageButtonStyle ?? {};

  return (
    <DefaultModal
      title={"Leave page"}
      description={"Leaving will cause to loose all changes!"}
      buttonTextModal={"Cancel"}
      styleType="dirty"
      showModal={showModal}
      setShowModal={setShowModal}
      modalButtonModifiers={modalButtonModifier}
      overflowOptions={overflowOptions}
    >
      <DefaultButtonComponent
        buttonText={"Cancel"}
        buttonType="button"
        styleType={cancelButtonFilled}
        onButtonClick={() => setShowModal(false)}
        modifier={cancelButtonModifiers}
      />

      <DefaultButtonComponent
        buttonText={"Save"}
        buttonType="button"
        styleType={leavePageFilled}
        onButtonClick={leavePageFunction}
        modifier={leavePageModifiers}
      />
    </DefaultModal>
  );
};
