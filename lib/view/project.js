const view = (project) => ({
  id: project.id,
  name: project.name,
  start_date: project.start_date,
  end_date: project.end_date,
  timeslots: project.timeslots,
});

const many = (projects) => projects.map((project) => view(project));

const projectView = (projects, unwrap) =>
  projects.length > 1
    ? many(projects)
    : unwrap
    ? view(projects[0])
    : [view(projects[0])];

export default projectView;
