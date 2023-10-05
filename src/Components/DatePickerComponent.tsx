import { Dispatch, SetStateAction, useState } from "react";
import { RangeKeyDict, DateRange, DefinedRange } from "react-date-range";
import { DateSelection } from "./Reports/AllClientsReportsPage";

export const DatePickerComponent = ({
  setSelectedDateRange,
  selectedDateRange,
}: {
  setSelectedDateRange: Dispatch<SetStateAction<DateSelection>>;
  selectedDateRange: DateSelection;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectedDateRange(ranges.selection as unknown as DateSelection);
  };
  const onClickClear = () => {
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <>
      {!showDatePicker ? (
        <button
          className="px-4 border-2 border-neutral-40 p-2 rounded-xl ml-2 laptop:w-1/12 tablet:w-10/12 text-error-50 hover:text-white hover:bg-primary-60 tablet:self-center  text-xl"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {showDatePicker ? "Hide" : "Pick dates"}
        </button>
      ) : null}
      {showDatePicker ? (
        <div className="laptop:w-2/12">
          <div className="flex justify-between mb-2">
            <button
              className=" text-success-50 px-4 border-2 ml-2 mt-2 border-neutral-40 p-2 rounded-xl w-5/12 self-center hover:text-white hover:bg-primary-60  text-xl"
              onClick={onClickClear}
            >
              Clear
            </button>
            <button
              className="px-4 border-2 border-neutral-40 p-2 rounded-xl ml-2 laptop:w-5/12 tablet:w-10/12 self-center text-error-50 hover:text-white hover:bg-primary-60  text-xl"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              Hide
            </button>
          </div>
          <div className="flex flex-col">
            <DateRange
              ranges={[selectedDateRange]}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              direction={
                window !== undefined &&
                window.innerWidth < 1200 &&
                window.innerWidth > 700
                  ? "horizontal"
                  : "vertical"
              }
              months={2}
            />
            <DefinedRange
              ranges={[selectedDateRange]}
              onChange={handleSelect}
              className="tablet:hidden"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
