import genericView from "./genericView";

export const userView = (user) => ({
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
});

const usersView = genericView(userView);

export default usersView;
