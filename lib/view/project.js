export const projectView = (project) => ({
  id: project.id,
  name: project.name,
  start_date: project.start_date,
  end_date: project.end_date,
});

export const projectsView = (projects) => {
  let views = [];
  for (let project of projects) {
    const copyIdx = views.findIndex((v) => v.project_id === project.project_id);
    if (copyIdx === -1) views.push({ ...project, timeslots: [project.title] });
    else views[copyIdx].timeslots.push(project.title);
  }

  return views.map((project) => ({
    ...projectView(project),
    timeslots: project.timeslots,
  }));
};
