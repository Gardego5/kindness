import genericView from "./genericView";

export const groupView = ({
  id,
  name,
  start_date,
  end_date,
  project_ids,
}: GroupView): GroupView => ({
  id,
  name,
  start_date,
  end_date,
  project_ids,
});

const groupsView = genericView(groupView);

export default groupsView;
