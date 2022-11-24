import genericView from "./genericView";

const visitView = genericView((visit) => ({
  date: visit.date,
  timeslot: visit.timeslot,
  users: visit.users,
}));

export default visitView;
