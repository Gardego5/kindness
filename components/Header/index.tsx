import { Root } from "./style";
import HomeButton from "@components/IconButtons/Home";
import LogoutButton from "@components/IconButtons/Logout";
import { useSelector } from "react-redux";
import { selectLoggedIn, selectName } from "@slice/session";

const Header = () => {
  const name = useSelector(selectName);
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <Root>
      <h1>Kindness</h1>

      {loggedIn && (
        <nav>
          <HomeButton />
          <p>{name}</p>
          <LogoutButton />
        </nav>
      )}
    </Root>
  );
};

export default Header;
