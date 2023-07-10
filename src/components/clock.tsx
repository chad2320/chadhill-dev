import dayjs from "dayjs";
import React from "react";

export const Clock = () => {
  const [dayTime, setDayTime] = React.useState(dayjs().format("h:mm:ss A"));
  const [date, setDate] = React.useState(dayjs().format("ddd D  MMM  YYYY"));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDayTime(dayjs().format("h:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row">
      <p className=" m-0 mr-1 border-l-[1px] border-black pl-1 font-chicago text-sm">
        {dayTime}
      </p>
      <p className=" m-0 mr-2 border-l-[1px] border-black pl-1 font-chicago text-sm ">
        {date}
      </p>
    </div>
  );
};
