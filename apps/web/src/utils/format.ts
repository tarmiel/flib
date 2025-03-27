import { default as dayjs } from 'dayjs';

export const formatDate = (date: dayjs.ConfigType) => dayjs(date).format('MMMM D, YYYY h:mm A');

export function formatDateIntl(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {},
) {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return null;
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Kiev',
  };

  const formatOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat('uk-UA', formatOptions).format(dateObj);
}
