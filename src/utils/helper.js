export const convertDateFormat = (inputDate) => {
  let dateParts = inputDate.split("T")[0].split("-");
  return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
};

export function ConvertReminderDateFormat(dateString){
  const date = new Date(dateString);

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  // get day,  month and years
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}

export function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function calculateAge(value , minAge) {
  const selectedDate = new Date(value);
  const currentDate = new Date();
  const yearsAgo = new Date(
    currentDate.getFullYear() - minAge,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  return selectedDate <= yearsAgo;
}
