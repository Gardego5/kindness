import genericView from "./genericView";

export const projectView = (project) => ({
  id: project.id,
  name: project.name,
  start_date: project.start_date,
  end_date: project.end_date,
  timeslots: project.timeslots,
});

const projectsView = genericView(projectView);

export default projectsView;
