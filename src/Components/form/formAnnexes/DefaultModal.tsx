import { DefaultButtonComponentProps } from "@/Components/Buttons";

import React, { Dispatch, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DefaultButtonComponent from "@/Components/DefaultButton";

type ModalProps = {
  title: string;
  description?: string;
  buttonTextModal?: string;
  styleType?: "filled" | "outlined" | "text" | "elevated" | "dirty";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  showModal: boolean;
  children: React.ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  closeModalAction?: () => void;
  overflowOptions?: string;
  modalButtonModifiers?: string;
  titleIcon?: React.ReactNode;
  subtitle?: string;
};

export type Buttons = {
  [key: string]: DefaultButtonComponentProps;
};

export const DefaultModal = ({
  subtitle,
  titleIcon,
  description,
  buttonTextModal,
  styleType,
  iconLeft,
  iconRight,
  disabled,
  showModal,
  setShowModal,
  children,
  closeModalAction,
  overflowOptions,
  modalButtonModifiers,
}: ModalProps) => {
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      {buttonTextModal && styleType && (
        <DefaultButtonComponent
          buttonType="button"
          onButtonClick={openModal}
          buttonText={buttonTextModal}
          styleType={styleType}
          disabled={disabled}
          modifier={`flex justify-evenly items-center ${modalButtonModifiers}`}
          iconLeft={iconLeft}
          iconRight={iconRight}
        />
      )}
      <Transition appear show={showModal}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-modalBox transform ${
                    overflowOptions ? overflowOptions : "overflow-hidden"
                  } rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all `}
                >
                  <Dialog.Title
                    as="h3"
                    className="font-bold leading-6 text-neutral-10 flex gap-2"
                  >
                    {titleIcon && (
                      <div className="h-6 flex items-center justify-center">
                        {titleIcon}
                      </div>
                    )}
                    <div className="w-full flex flex-col gap-1">
                      {subtitle && (
                        <div className="text-titleSmall">{subtitle}</div>
                      )}
                    </div>
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="mt-6 text-bodySmall font-normal">
                      {description}
                    </Dialog.Description>
                  )}
                  <div
                    className=" absolute top-5 right-0 h-10 w-10 cursor-pointer"
                    onClick={closeModalAction ? closeModalAction : closeModal}
                  ></div>

                  <div className="mt-6 flex justify-center space-x-10 text-bodySmall font-normal">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
