import genericView from "./genericView";

export const alertView = ({
  location,
  content,
  user_ids,
  group_ids,
  project_ids,
}: AlertView): AlertView => ({
  location,
  content,
  user_ids,
  group_ids,
  project_ids,
});

const alertsView = genericView(alertView);

export default alertsView;
