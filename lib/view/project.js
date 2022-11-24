import genericView from "./genericView";

const projectView = genericView((project) => ({
  id: project.id,
  name: project.name,
  start_date: project.start_date,
  end_date: project.end_date,
  timeslots: project.timeslots,
}));

export default projectView;
