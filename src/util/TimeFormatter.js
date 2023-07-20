const TimeFormatter = ({ time }) => {
  const formatTime = (inputTime) => {
    const [hour, minute, second] = inputTime.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);

    const formattedTime = date.toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  };

  const formattedTime = formatTime(time);

  return <span>{formattedTime}</span>;
};

export default TimeFormatter;
