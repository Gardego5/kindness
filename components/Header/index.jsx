import { Root } from "./style";
import HomeButton from "@components/IconButtons/Home";
import LogoutButton from "@components/IconButtons/Logout";
import { useUser } from "hooks/useContexts";

const Header = () => {
  const { user, name } = useUser();

  return (
    <Root>
      <h1>Kindness</h1>

      {user && (
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
