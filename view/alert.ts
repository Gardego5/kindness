import genericView from "./genericView";

export const alertView = ({
  location,
  content,
  user_id,
  group_id,
  project_id,
}: AlertView): AlertView => ({
  location,
  content,
  user_id,
  group_id,
  project_id,
});

const alertsView = genericView(alertView);

export default alertsView;
