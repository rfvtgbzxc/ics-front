import React from 'react';
import { DatePicker } from "antd";
import moment from "moment";
function XWDatePicker({value,onChange}) {
  const in_dates = value ? moment().year(value[0]).month(value[1]-1).date(value[2]) : value;
  const handleOnChange = value => {
    console.log(value.year(),value.month(),value.date());
    const dates = value ? [value.year(),value.month()+1,value.date()] : value;
    onChange && onChange(dates);
  };
  return <DatePicker value={in_dates} onChange={handleOnChange} />
}

export default XWDatePicker;