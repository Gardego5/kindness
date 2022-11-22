const userView = (user) => ({
  user: {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
  },
});

export default userView;
