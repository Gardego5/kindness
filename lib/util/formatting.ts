export const displayName = (user: UserView) =>
  user.first_name.slice(0, 1).toUpperCase() +
  user.first_name.slice(1) +
  " " +
  user.last_name[0].toUpperCase() +
  ".";
