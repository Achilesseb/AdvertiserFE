import { Combobox, Transition } from "@headlessui/react";
import { debounce } from "lodash";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  FieldValues,
  UseFormTrigger,
  UseFormSetValue,
  UseFormGetValues,
  Path,
} from "react-hook-form";

type DropDownPropTypes<T extends {}, FormTypes extends FieldValues> = {
  debouncer: number;
  data?: Array<{ id: string; data: T; disabled?: boolean }>;
  onChangeInputValue?: Dispatch<SetStateAction<string>>;
  onSelectValue?: (value: ValueReturnType) => void;
  className?: string;
  error?: string;
  formTrigger?: UseFormTrigger<FormTypes>;
  setValue?: UseFormSetValue<FormTypes>;
  getValues?: UseFormGetValues<FormTypes>;
  disabled?: boolean;
  displayValue?: string;
  displayKey?: string;
  placeholder?: string;
};

export type ValueReturnType = {
  id: string;
  data: Record<string, unknown> | null;
};

export const DropDownComponent = <
  DataType extends {},
  FormTypes extends FieldValues
>({
  debouncer,
  data,
  onChangeInputValue,
  onSelectValue,
  className,
  displayValue,
  error,
  ...props
}: DropDownPropTypes<DataType, FormTypes>) => {
  const [selectedResults, setSelectedResults] = useState<
    ValueReturnType | "Invalid value"
  >({ id: "", data: null });
  const [query, setQuery] = useState("");

  const handleQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setQuery(e.target.value);
      onChangeInputValue?.(e.target.value);
    },
    [onChangeInputValue]
  );

  const debounceResults = useMemo(() => {
    return debounce(handleQuery, debouncer ? debouncer : 0);
  }, [debouncer, handleQuery]);

  const filterSearchResults = () => {
    if (query === "" || !data) {
      return;
    }
    return data.filter((result) => {
      return (result.data?.[props.displayKey as keyof DataType] as string)
        ?.toLowerCase()
        .includes(query.toLowerCase());
    });
  };

  const filteredResults = filterSearchResults();

  const handleComboboxChange = (
    value: ValueReturnType | "Invalid value" | null
  ) => {
    if (value === "Invalid value") {
      return null;
    }

    if (!value || error) {
      setSelectedResults({ id: "", data: null });
      onSelectValue?.({ id: "", data: null });

      return;
    }

    setSelectedResults(value);
    onSelectValue?.(value);

    return;
  };

  const generateOptionList = () => {
    if (!filteredResults && query === "") return null;

    return (
      <Combobox.Options className="absolute z-50 w-full h-auto bg-white border border-neutral-70 rounded-md p-2">
        {filteredResults && filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <Combobox.Option
              key={index}
              value={result}
              disabled={typeof result !== "string" ? result.disabled : false}
              className={`m-1 hover:bg-neutral-80 hover:cursor-pointer ${
                !result.data ? "text-error-30" : ""
              }`}
            >
              {result?.data?.[props.displayKey as keyof DataType] as string}
            </Combobox.Option>
          ))
        ) : (
          <Combobox.Option
            key="job_generator_invalid_search"
            value="Invalid value"
            disabled={true}
            className="m-1 text-error-50 text-bodyMedium "
          >
            Invalid value
          </Combobox.Option>
        )}
      </Combobox.Options>
    );
  };

  return (
    <div className={`w-74 ${className}`}>
      <Combobox
        value={selectedResults}
        disabled={props.disabled}
        onChange={(value) => handleComboboxChange(value)}
        nullable
      >
        <div className="relative">
          <Combobox.Input
            name="searchInput"
            onChange={(event) => debounceResults(event)}
            placeholder={props?.placeholder as string}
            displayValue={(result: ValueReturnType) =>
              displayValue ??
              props?.getValues?.(
                props.displayKey as unknown as Path<FormTypes>
              ) ??
              (result?.data?.[props?.displayKey ?? ""] as string) ??
              ""
            }
            className={`w-full outline-none h-12 border ${
              props.disabled
                ? "text-neutral-50 bg-neutral-95 border-neutral-70"
                : "border-neutral-70"
            }  rounded-md p-4 focus:border-neutral-50 transition ease-in-out duration-200 text-bodyLarge font-normal ${
              error && "border-error-40"
            }`}
          />
          <Transition
            leave="transition ease-in-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {generateOptionList()}
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
