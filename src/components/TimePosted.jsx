// Function to calculate the time difference to display how long ago the post was posted
const calculateTimeDifference = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const timeDifference = now - postDate;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (yearsDifference > 0) {
    return `Posted ${yearsDifference} ${
      yearsDifference === 1 ? "year" : "years"
    } ago`;
  } else if (monthsDifference > 0) {
    return `Posted ${monthsDifference} ${
      monthsDifference === 1 ? "month" : "months"
    } ago`;
  } else if (daysDifference > 0) {
    return `Posted ${daysDifference} ${
      daysDifference === 1 ? "day" : "days"
    } ago`;
  } else if (hoursDifference > 0) {
    return `Posted ${hoursDifference} ${
      hoursDifference === 1 ? "hour" : "hours"
    } ago`;
  } else if (minutesDifference > 0) {
    return `Posted ${minutesDifference} ${
      minutesDifference === 1 ? "minute" : "minutes"
    } ago`;
  } else {
    return "Posted just now";
  }
};

export default calculateTimeDifference;
