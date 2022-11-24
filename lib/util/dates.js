export const oneDay = 86_400_000;

export const today = () => new Date(new Date().toDateString());

export const findStartOfWeek = (d) => {
  const yesterday = new Date(d - oneDay);
  return yesterday.getDay() === 0 ? yesterday : findStartOfWeek(yesterday);
};
