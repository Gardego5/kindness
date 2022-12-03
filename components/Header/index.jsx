import userContext from "@context/userContext";
import { useContext } from "react";
import { Root } from "./style";
import HomeButton from "@components/IconButtons/Home";
import LogoutButton from "@components/IconButtons/Logout";

const Header = () => {
  const { user, name } = useContext(userContext);

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
