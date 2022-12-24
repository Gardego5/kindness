import genericView from "./genericView";

export const userView = ({
  username,
  first_name,
  last_name,
}: UserView): UserView => ({
  username,
  first_name,
  last_name,
});

const usersView = genericView(userView);

export default usersView;
