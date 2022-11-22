const projectView = (project) => ({
  project: {
    name: project.name,
    start_date: project.start_date,
    end_date: project.end_date,
  },
});

export default projectView;
