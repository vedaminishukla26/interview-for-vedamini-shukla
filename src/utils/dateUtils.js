import { format } from 'date-fns'

export const formatUtcDate = (utcString, pattern = 'dd MMMM yyyy HH:mm') => {
  if (!utcString) return '—';
  const date = new Date(utcString);
  return isNaN(date) ? '—' : format(date, pattern);
};

export const dateRangeLabel = ({ from, to }) => {
  if (!from) return 'Select dates';
  if (!to) return format(from, 'MMM d, yyyy');
  return `${format(from, 'MMM d, yyyy')} - ${format(to, 'MMM d, yyyy')}`;
};

export default {
  formatUtcDate,
  dateRangeLabel,
}; 