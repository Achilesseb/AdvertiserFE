"use client";

import _ from "lodash";
import ADVButton from "../Buttons";

const getHeaderElement = ({ type, ...rest }: TableHeaderElement) => {
  let element;
  switch (type) {
    case "button":
      const buttonProps = rest as HeaderButtonProps;
      const onClickHandler = async () => {
        if (buttonProps?.refetch && buttonProps.onClick) {
          await buttonProps?.onClick();
          await buttonProps?.refetch();
        } else if (!buttonProps?.refetch && buttonProps.onClick)
          buttonProps?.onClick();
      };
      element = (
        <ADVButton
          key={buttonProps.buttonText}
          buttonText={buttonProps.buttonText}
          styleType={buttonProps.style}
          modifier={buttonProps?.styleModifiers}
          onButtonClick={onClickHandler}
        />
      );
      break;
    case "input":
      const inputProps = rest as HeaderInputProps;
      element = (
        <input
          key={inputProps.inputPlaceHolder}
          onChange={inputProps.onChange}
          type="text"
          className={inputProps.styleModifiers}
          placeholder={inputProps.inputPlaceHolder}
          aria-label="Username"
          aria-describedby="basic-addon1"
        ></input>
      );
      break;
  }
  return element;
};

type HeaderButtonProps = {
  type: "button";
  style: "filled" | "outlined" | "dirty";
  buttonText: string;
  styleModifiers?: string;
  onClick?: () => void;
  refetch?: () => void;
};

type HeaderInputProps = {
  type: "input";
  inputPlaceHolder?: string;
  styleModifiers?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type TableHeaderElement =
  | {
      type: "react-element";
    }
  | HeaderButtonProps
  | HeaderInputProps;

export const TableHeader = ({
  elements,
}: {
  elements: Record<string, TableHeaderElement>;
}) => {
  if (_.isNil(elements) || !_.isObject(elements)) return;

  return (
    <div className="grid grid-cols-12 gap-4 tablet:flex tablet:flex-col">
      {Object.values(elements).map((element) => getHeaderElement(element))}
    </div>
  );
};
