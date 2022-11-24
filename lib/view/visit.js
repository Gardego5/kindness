import genericView from "./genericView";

export const visitView = (visit) => ({
  date: visit.date,
  timeslot: visit.timeslot,
  users: visit.users,
});

const visitsView = genericView(visitView);

export default visitsView;
