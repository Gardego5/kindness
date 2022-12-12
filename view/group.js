import genericView from "./genericView";

export const groupView = (group) => ({
  id: group.id,
  name: group.name,
  start_date: group.start_date,
  end_date: group.end_date,
  project_ids: group?.project_ids,
});

const groupsView = genericView(groupView);

export default groupsView;
