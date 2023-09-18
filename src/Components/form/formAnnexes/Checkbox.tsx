import { useState, forwardRef, useEffect } from "react";

type CheckboxComponentPropTypes = {
  name?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  setValue?: unknown;
};

const CheckboxComponent = forwardRef<
  HTMLInputElement,
  CheckboxComponentPropTypes
>(({ name, id, label, disabled, checked, ...props }, ref) => {
  const [check, setChecked] = useState(checked);
  const onClick = () => {
    if (!disabled) setChecked(!check);
  };
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label htmlFor={name} className="text-labelLarge font-medium truncate">
          {label}
        </label>
      )}
      <div
        className={`${
          disabled
            ? "accent-white"
            : "hover:bg-neutral-95 active:bg-neutral-90  transition ease-in-out duration-200"
        } rounded-full w-fit flex items-center justify-center h-10`}
        onClick={onClick}
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={check}
          disabled={disabled}
          ref={ref}
          {...props}
          className="accent-black w-5 h-5 border-2 "
        />
      </div>
    </div>
  );
});
CheckboxComponent.displayName = "CheckboxComponent";
export default CheckboxComponent;
