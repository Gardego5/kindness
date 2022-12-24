import genericView from "./genericView";

export const visitView = ({ date, timeslot, users }: VisitView): VisitView => ({
  date,
  timeslot,
  users,
});

const visitsView = genericView(visitView);

export default visitsView;
