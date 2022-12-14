import { selectUser } from "@slice/session";
import { useTypedSelector } from "store";
import { Root, classes } from "./style";

const AuthDebug = () => {
  const user = useTypedSelector(selectUser);

  return (
    <Root>
      <table className={classes.userInfo}>
        <tbody>
          <tr>
            <th colSpan={2}>User Info</th>
          </tr>
          <tr>
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{user.first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{user.last_name}</td>
          </tr>
        </tbody>
      </table>
    </Root>
  );
};

export default AuthDebug;
