import { Root } from "./style";
import HomeButton from "@components/IconButtons/Home";
import LogoutButton from "@components/IconButtons/Logout";
import { selectLoggedIn, selectName } from "@slice/session";
import { useTypedSelector } from "store";

const Header = () => {
  const name = useTypedSelector(selectName);
  const loggedIn = useTypedSelector(selectLoggedIn);

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
