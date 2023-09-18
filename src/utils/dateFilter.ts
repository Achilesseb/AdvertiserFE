import dayjs from 'dayjs';

type DateRange = {
  start: string | Date;
  end: string | Date;
};

export const getDateRange = (selectedTime: string) => {
  const date = new Date();

  const day = dayjs(date).format('YYYY-MM-DD');

  const endOfToday = dayjs(day).endOf('day').format('YYYY-MM-DD');
  const startOfToday = dayjs(day).startOf('day').format('YYYY-MM-DD');

  const endOfYesterday = dayjs(day)
    .subtract(1, 'day')
    .endOf('day')
    .format('YYYY-MM-DD');
  const startOfYesterday = dayjs(day)
    .subtract(1, 'day')
    .startOf('day')
    .format('YYYY-MM-DD');

  const startOfWeek = dayjs(day)
    .startOf('week')
    .add(1, 'day')
    .format('YYYY-MM-DD');

  const startOfLastWeek = dayjs(day)
    .subtract(1, 'week')
    .startOf('week')
    .add(1, 'day')
    .format('YYYY-MM-DD');
  const endOfLastWeek = dayjs(day)
    .subtract(1, 'week')
    .endOf('week')
    .add(1, 'day')
    .format('YYYY-MM-DD');

  const startOfMonth = dayjs(day).startOf('month').format('YYYY-MM-DD');

  const startOfLastMonth = dayjs(day)
    .subtract(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const endOfLastMonth = dayjs(day)
    .subtract(1, 'month')
    .endOf('month')
    .format('YYYY-MM-DD');

  const dateRanges: Record<string, DateRange> = {
    Today: { start: startOfToday, end: endOfToday },
    Yesterday: { start: startOfYesterday, end: endOfYesterday },
    'This week': { start: startOfWeek, end: endOfToday },
    'Last week': { start: startOfLastWeek, end: endOfLastWeek },
    'This month': { start: startOfMonth, end: endOfToday },
    'Last month': { start: startOfLastMonth, end: endOfLastMonth },
    All: { start: '1990-01-01', end: endOfToday },
  };

  const selectedDateRange = dateRanges[selectedTime];

  const start = selectedDateRange?.start;
  const end = selectedDateRange?.end;

  return { start, end };
};

export const mapDates = (timeRanges: string[]) => {
  return timeRanges.map(selectedTime => {
    return getDateRange(selectedTime);
  });
};
