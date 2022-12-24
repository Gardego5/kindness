import genericView from "./genericView";

export const projectView = ({
  id,
  name,
  start_date,
  end_date,
  timeslots,
}: ProjectView): ProjectView => ({
  id,
  name,
  start_date,
  end_date,
  timeslots,
});

const projectsView = genericView(projectView);

export default projectsView;
