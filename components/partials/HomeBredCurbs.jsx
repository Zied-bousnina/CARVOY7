import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import { Modal, DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";

const HomeBredCurbs = ({ title, onFilterChange, headerslot=false }) => {
  const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const handleWeeklyFilter = () => {
    setIsWeeklyModalOpen(true);
  };

  const handleDateSelection = () => {
    setIsDateModalOpen(true);
  };

  const handleWeekSelect = (date) => {
    const startOfWeek = dayjs(date).startOf("week").format("YYYY-MM-DD");
    const endOfWeek = dayjs(date).endOf("week").format("YYYY-MM-DD");
    const weekRange = { startDate: startOfWeek, endDate: endOfWeek };

    setSelectedWeek(weekRange);
    setIsWeeklyModalOpen(false);
    onFilterChange(weekRange);
  };

  const handleDateRangeChange = (dates) => {
    if (!dates || dates.length < 2) {
      // If dates are invalid or not selected, handle it appropriately
      setSelectedDateRange(null);
      setIsDateModalOpen(false);
      onFilterChange({ startDate: null, endDate: null });
      return;
    }

    const range = {
      startDate: dates[0]?.format("YYYY-MM-DD"),
      endDate: dates[1]?.format("YYYY-MM-DD"),
    };

    setSelectedDateRange(range);
    setIsDateModalOpen(false);
    onFilterChange(range);
  };


  return (
    <div className="flex justify-between flex-wrap items-center mb-6">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        {title}
      </h4>
      {
        headerslot &&

      <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
        <div
          className="date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
          onClick={handleWeeklyFilter}
        >
          <span className="text-lg">
            <Icon icon="heroicons:calendar" />
          </span>
          <span>Weekly</span>
        </div>
        <div
          className="date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
          onClick={handleDateSelection}
        >
          <span className="text-lg">
            <Icon icon="heroicons-outline:filter" />
          </span>
          <span>Select Date</span>
        </div>
      </div>
      }

      {/* Weekly Modal */}
      <Modal
        title="Select Week"
        visible={isWeeklyModalOpen}
        onCancel={() => setIsWeeklyModalOpen(false)}
        footer={null}
      >
        <DatePicker
          picker="week"
          onChange={handleWeekSelect}
          style={{ width: "100%" }}
        />
      </Modal>

      {/* Date Range Modal */}
      <Modal
        title="Select Date Range"
        visible={isDateModalOpen}
        onCancel={() => setIsDateModalOpen(false)}
        footer={null}
      >
        <DatePicker.RangePicker
          onChange={handleDateRangeChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default HomeBredCurbs;
