export const oneDay = 86_400_000;

export const today = () => new Date(new Date().toDateString());

export const findStartOfWeek = (d: Date) => {
  const yesterday = new Date(d.getTime() - oneDay);
  return yesterday.getDay() === 0 ? yesterday : findStartOfWeek(yesterday);
};

export const localizeDate = (d: Date) =>
  new Date(new Date(d).valueOf() + new Date().getTimezoneOffset() * 60 * 1000);
