export const oneDay = 86_400_000;

export const today = () => new Date(new Date().toDateString());

export const findStartOfWeek = (d) => {
  const yesterday = new Date(d - oneDay);
  return yesterday.getDay() === 0 ? yesterday : findStartOfWeek(yesterday);
};

export const localizeDate = (d) =>
  new Date(new Date(d).valueOf() + new Date().getTimezoneOffset() * 60 * 1000);
