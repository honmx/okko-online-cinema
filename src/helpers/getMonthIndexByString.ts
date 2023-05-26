export const getMonthIndexByString = (monthString: string) => {
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  return months.indexOf(monthString.toLowerCase());
}