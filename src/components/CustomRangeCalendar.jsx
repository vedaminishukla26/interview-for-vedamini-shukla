import { memo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, addYears, format, isSameDay } from "date-fns";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

function CustomRangeCalendar({ selectedRange, onSelect }) {
  const [currentLeftMonth, setCurrentLeftMonth] = useState(new Date());
  const [currentRightMonth, setCurrentRightMonth] = useState(addMonths(new Date(), 1));

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentLeftMonth, 1);
    setCurrentLeftMonth(newMonth);
    setCurrentRightMonth(addMonths(newMonth, 1));
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentLeftMonth, 1);
    setCurrentLeftMonth(newMonth);
    setCurrentRightMonth(addMonths(newMonth, 1));
  };

  const handleLeftMonthChange = (month) => {
    setCurrentLeftMonth(month);
  };
  const handleRightMonthChange = (month) => {
    setCurrentRightMonth(month);
  };

  const handleLeftYearChange = (yearChange) => {
    setCurrentLeftMonth(addYears(currentLeftMonth, yearChange));
  };
  const handleRightYearChange = (yearChange) => {
    setCurrentRightMonth(addYears(currentRightMonth, yearChange));
  };

  const handleDateClick = (date) => {
    if (!selectedRange?.from) {
      onSelect({ from: date, to: undefined });
    } else if (!selectedRange?.to) {
      if (date < selectedRange.from) {
        onSelect({ from: date, to: selectedRange.from });
      } else {
        onSelect({ ...selectedRange, to: date });
      }
    } else {
      onSelect({ from: date, to: undefined });
    }
  };

  const renderMonth = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      const isSelectedStart = selectedRange?.from && isSameDay(date, selectedRange.from);
      const isSelectedEnd = selectedRange?.to && isSameDay(date, selectedRange.to);
      const isInRange =
        selectedRange?.from &&
        selectedRange?.to &&
        date > selectedRange.from &&
        date < selectedRange.to;

      days.push(
        <button
          key={`day-${day}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            isSelectedStart || isSelectedEnd ? "bg-blue-100 text-blue-600 font-semibold" : ""
          } ${isInRange ? "bg-blue-100" : ""} hover:bg-blue-100`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="rounded-lg p-4 w-max bg-white shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-medium">{format(currentLeftMonth, "MMMM")}</span>
            <div className="flex flex-col ml-1">
              <button onClick={() => handleLeftMonthChange(addMonths(currentLeftMonth, 1))} className="p-0 hover:bg-gray-100 rounded">
                <TiArrowSortedUp className="h-3 w-3" />
              </button>
              <button onClick={() => handleLeftMonthChange(subMonths(currentLeftMonth, 1))} className="p-0 hover:bg-gray-100 rounded">
                <TiArrowSortedDown className="h-3 w-3" />
              </button>
            </div>
          </div>
          <span className="font-medium">{format(currentLeftMonth, "yyyy")}</span>
          <div className="flex flex-col ml-1">
            <button onClick={() => handleLeftYearChange(1)} className="p-0 hover:bg-gray-100 rounded">
              <TiArrowSortedUp className="h-3 w-3" />
            </button>
            <button onClick={() => handleLeftYearChange(-1)} className="p-0 hover:bg-gray-100 rounded">
              <TiArrowSortedDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-medium">{format(currentRightMonth, "MMMM")}</span>
            <div className="flex flex-col ml-1">
              <button onClick={() => handleRightMonthChange(addMonths(currentRightMonth, 1))} className="p-0 hover:bg-gray-100 rounded">
                <TiArrowSortedUp className="h-3 w-3" />
              </button>
              <button onClick={() => handleRightMonthChange(subMonths(currentRightMonth, 1))} className="p-0 hover:bg-gray-100 rounded">
                <TiArrowSortedDown className="h-3 w-3" />
              </button>
            </div>
          </div>
          <span className="font-medium">{format(currentRightMonth, "yyyy")}</span>
          <div className="flex flex-col ml-1">
            <button onClick={() => handleRightYearChange(1)} className="p-0 hover:bg-gray-100 rounded">
              <TiArrowSortedUp className="h-3 w-3" />
            </button>
            <button onClick={() => handleRightYearChange(-1)} className="p-0 hover:bg-gray-100 rounded">
              <TiArrowSortedDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        <button onClick={handleNextMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-8">
        <div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="w-8 h-8 flex items-center justify-center text-xs text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderMonth(currentLeftMonth)}</div>
        </div>

        <div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={`${day}-2`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderMonth(currentRightMonth)}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomRangeCalendar); 